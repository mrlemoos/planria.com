
import packageJSON from '../../package.json' with { format: 'json' };

export const APP_NAME = 'planria' as const;

export const DOMAIN = 'planria.com' as const;

export const APP_URL = `https://${DOMAIN}` as const;

export const APP_VERSION = `${packageJSON.version}` as const;

export const GIT_REPOSITORY_URL =
  "https://github.com/mrlemoos/planria.com" as const;

export const PRODUCT_DESCRIPTION = `${packageJSON.description}` as const;

export const CONTACT_EMAIL = `contact@${DOMAIN}` as const;

export const SUPPORT_EMAIL = `support@${DOMAIN}` as const;

export const PURCHASES_EMAIL = `purchases@${DOMAIN}` as const;

export const SOFTWARE_LICENSE = `${packageJSON.license}` as const;

export const SOFTWARE_LICENSE_URL =
  "https://github.com/planria/planria/blob/main/LICENSE" as const;

export const FULL_SOFTWARE_LICENSE_URL =
  "https://apache.org/licenses/LICENSE-2.0" as const;
