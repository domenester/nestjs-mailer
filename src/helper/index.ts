import { InternalServerErrorException } from '@nestjs/common';
import * as ejs from 'ejs';
import * as path from 'path';

export const getHtmlRendered = async (
  fileName: string,
  body: any
) => {
  try {
    const html = await ejs.renderFile(
      path.join(process.cwd(), `/dist/templates/${fileName}.html`),
      body
    )
    return html
  } catch (err) {
    throw new InternalServerErrorException(err)
  }
}
