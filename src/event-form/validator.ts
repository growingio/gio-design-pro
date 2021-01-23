import { isEmpty } from 'lodash';
import { DocProps } from '../types';
import { TagElement } from './TagElement';
import { matchString, matchQuery } from './utils';

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

  public findExistElementTag(definition: DocProps) {
    const accurate = true;
    // const { definition } = currentTag;
    const equalString = (s1: any, s2: any): boolean => {
      return (!s1 && !s2) || matchString(s1, s2, accurate);
    };
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
}
export default ValidatorHelper;
