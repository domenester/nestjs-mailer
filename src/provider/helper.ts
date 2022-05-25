import { InternalServerErrorException } from '@nestjs/common';
import * as ejs from 'ejs';
import * as path from 'path';

export const getHtmlRendered = async (
  fileName: string,
  body: any
) => {
  try {
    const {SERVERLESS} = process.env
    console.log('SERVERLESS: ', SERVERLESS);
    const pathJoint = path.join(
      process.cwd(),
      `${!SERVERLESS ? '/dist' : ''}/templates/${fileName}.html`
    )
    const html = await ejs.renderFile(pathJoint, body)
    return html
  } catch (err) {
    console.log('err: ', err);
    throw new InternalServerErrorException(err)
  }
}
