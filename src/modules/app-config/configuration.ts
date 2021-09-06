import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

let YAML_CONFIG_FILENAME = 'conf/config.yml';
if (process.env.APP_ENVIRONMENT) {
  YAML_CONFIG_FILENAME = `conf/config.${process.env.APP_ENVIRONMENT}.yml`;
}

console.log(`Using configuration ${YAML_CONFIG_FILENAME}`);

export default () => {
  return yaml.load(
    readFileSync(join(YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};