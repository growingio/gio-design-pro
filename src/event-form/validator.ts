import { cloneDeep, get, isEmpty, omit } from 'lodash';
import { DocProps } from '../types';
import { ElementFormValues, PageViewFormValues, Rule } from './interfaces';
import { TagElement } from './TagElement';
import { LimitCondition } from './types';
import { matchString, matchQuery, kvsToQuery } from './utils';

const whitespaceRule = {
  pattern: /^\S.*\S$|(^\S{0,1}\S$)/,
  message: '首、末位不支持输入空格',
  validateTrigger: 'onBlur',
};
class ValidatorHelper {
  private definedTags: TagElement[];

  public tagNames: string[];

  constructor(projectTdefinedTags: TagElement[]) {
    this.definedTags = projectTdefinedTags;
    this.tagNames = this.definedTags?.map((v) => v.name);
  }

  public checkName(value: string): Promise<any> {
    const self = this;
    return new Promise((resolve, reject) => {
      if (self.tagNames?.some((v) => v === value)) {
        reject(new Error('该名称已存在'));
      }
      resolve(true);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public async checkPath(value: { path?: string; checked?: boolean }) {
    if (!value?.checked) {
      return Promise.resolve(true);
    }
    if (isEmpty(value.path)) {
      return Promise.reject(new Error('路径在开启状态下为必填项'));
    }
    return Promise.resolve(true);
  }

  public async checkPageViewDefinition(definition: DocProps) {
    const repeat = await this.findRepeatPageTag(definition);
    if (repeat) {
      return Promise.reject(new Error('已定义'));
    }
    return Promise.resolve(true);
  }

  // public async checkElementDefinition(definition: DocProps) {
  //   const repeat = await this.findRepeatElementTag(definition);
  //   if (repeat) {
  //     return Promise.reject(new Error('已定义'));
  //   }
  //   return Promise.resolve(true);
  // }

  public findRepeatElementTag(definition: DocProps) {
    const accurate = true;
    // let { definition } = this.getInput();

    const equalString = (s1: any, s2: any): boolean => (!s1 && !s2) || matchString(s1, s2, accurate);

    const equalQuery = (patten?: string, query?: string): boolean => {
      if (!patten && !query) return true;
      return matchQuery(patten || '', query || '', accurate);
    };

    return this.definedTags.find((tag) => {
      const tagDefinition = tag.definition;
      return (
        tag.docType === 'elem' &&
        matchString(tagDefinition.domain, definition.domain, accurate) &&
        equalString(tagDefinition.path, definition.path) &&
        equalQuery(tagDefinition.query, definition.query) &&
        equalString(tagDefinition.content, definition.content) &&
        equalString(tagDefinition.index, definition.index) &&
        equalString(tagDefinition.href, definition.href) &&
        equalString(tagDefinition.contentType, definition.contentType) &&
        equalString(tagDefinition.xpath, definition.xpath)
      );
    });
  }

  public findRepeatPageTag(definition: DocProps) {
    // 精准匹配
    const accurate = true;
    // const { definition } = currentTag;
    const equalString = (s1: any, s2: any): boolean => (!s1 && !s2) || matchString(s1, s2, accurate);
    const equalQuery = (patten?: string, query?: string): boolean => {
      if (!patten && !query) return true;
      return matchQuery(patten || '', query || '', accurate);
    };
    return this.definedTags.find((tag: TagElement) => {
      const tagDefinition = tag.definition;
      return (
        tag.docType === 'page' &&
        matchString(tagDefinition.domain, definition.domain, accurate) &&
        equalString(tagDefinition.path, definition.path) &&
        equalQuery(tagDefinition.query, definition.query)
      );
    });
  }

  static conversionPageViewSubmitValue = (formValues: any): PageViewFormValues => {
    const tempValue = cloneDeep(formValues);
    const defined = get(tempValue, 'definition', {});

    const path = get(defined, 'path', {});
    if (path && path.checked) {
      defined.path = path.path;
    } else {
      defined.path = undefined;
    }
    const query = get(tempValue, 'definition.query');
    if (query) {
      defined.query = kvsToQuery(query);
    } else {
      defined.query = undefined;
    }
    tempValue.definition = defined;
    return { ...omit(tempValue, 'belongApp') } as PageViewFormValues;
  };

  static conversionElementSubmitValue = (formValues: any): ElementFormValues => {
    const tempValue = cloneDeep(formValues);
    const { limitCondition = {}, definition, belongPage } = tempValue;
    const { content, index, href, contentType } = limitCondition;
    const { contentChecked, indexChecked, hrefChecked } = limitCondition;
    // const {
    //   definition: { path, domain, query },
    // } = (belongPage || {}) as TagElement;
    const pageDefine = (belongPage as TagElement)?.definition;
    const { path, domain, query } = pageDefine || {};
    const limit: LimitCondition = {
      content: contentChecked ? content : undefined,
      index: indexChecked ? index : undefined,
      href: hrefChecked ? href : undefined,
      contentType: contentChecked ? contentType : definition?.contentType,
    };
    const newDefinition = { ...get(tempValue, 'definition'), ...{ path, domain, query }, ...limit };
    tempValue.definition = newDefinition;
    return { ...omit(tempValue, 'limitCondition', 'belongPage', 'belongApp') } as ElementFormValues;
  };

  public validateRules: { [key: string]: Rule[] } = {
    name: [
      { required: true, message: '名称不能为空', validateTrigger: 'onChange' },
      whitespaceRule,
      {
        validator: async (_, value) => this.checkName(value),
        validateTrigger: 'onSubmit',
      },
    ],
    description: [],
    belongApp: [],
    limitCondition: [
      // {
      //   message: whitespaceRule.message,
      //   validator: async () => true,
      //   validateTrigger: 'onChange',
      // },
    ],
    definition: [
      ({ getFieldsValue }) => ({
        validateTrigger: ['onChange', 'onSubmit'],
        validator: async () => {
          // console.warn('definition validator');
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          const formValues = getFieldsValue(true);
          const { definition } = ValidatorHelper.conversionElementSubmitValue(formValues) as ElementFormValues;

          const repeatRuleTag = this.findRepeatElementTag(definition);
          if (repeatRuleTag != null) {
            throw new Error('规则已定义');
          }
        },
      }),
    ],
    belongPage: [
      {
        required: true,
        message: '所属页面不能为空',
        validateTrigger: 'onChange',
        validator: async (rule, value) => {
          if (!value || !value.id) {
            throw new Error(rule.message as string);
          }
        },
      },
    ],
  };
}
export default ValidatorHelper;
