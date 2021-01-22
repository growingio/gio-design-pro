import { isEmpty } from 'lodash';
import { TagElement } from './TagElement';

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
}
export default ValidatorHelper;
