/*
Copyright 2022-2023 The Tekton Authors
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import {
  Branch20 as GitIcon,
  Timer20 as TimerIcon,
  Flash20 as TriggerIcon,
  User20 as UserIcon,
  Webhook20 as WebhookIcon,
  CheckmarkFilled20 as CheckmarkFilled,
  CheckmarkFilledWarning20 as CheckmarkFilledWarning,
  CheckmarkOutline20 as CheckmarkOutline,
  CloseFilled20 as CloseFilled,
  CloseOutline20 as CloseOutline,
  Time20 as Pending,
  PendingFilled20 as Skipped,
  WarningAltFilled20 as WarningFilled,
  DataDiode20 as Finally,
} from '@carbon/icons-react';
import { classNames } from '@tektoncd/dashboard-utils';

import { Spinner } from '@tektoncd/dashboard-components';

const icons = {
  
   inverse: {
    cancelled: CloseOutline,
    error: CloseOutline,
    pending: Pending,
    running: Spinner,
    success: CheckmarkOutline,
    warning: WarningFilled,
  },
  normal: {
    dummy: () => <></>, // eslint-disable-line react/jsx-no-useless-fragment
    cancelled: CloseFilled,
    error: CloseFilled,
    pending: Pending,
    running: Spinner,
    success: CheckmarkFilled,
    warning: CheckmarkFilledWarning,
    skipped: Skipped,
    git: GitIcon,
    manual: UserIcon,
    timer: TimerIcon,
    trigger: TriggerIcon,
    webhook: WebhookIcon,
    finally : Finally
  }
};

const statusClassNames = {
  cancelled: 'tkn--status-icon--cancelled',
  error: 'tkn--status-icon--error',
  pending: 'tkn--status-icon--pending',
  running: 'tkn--status-icon--running',
  success: 'tkn--status-icon--success',
  warning: 'tkn--status-icon--warning',
  skipped: 'tkn--status-icon--skipped'
};

const typeClassNames = {
  inverse: 'tkn--status-icon--type-inverse',
  normal: 'tkn--status-icon--type-normal'
};

export default function StatusIcon({
  DefaultIcon,
  status,
  title,
  type = 'normal'
}) {
  const Icon = icons[type]?.[status] || DefaultIcon;

  return Icon ? (
    <Icon
      className={classNames('tkn--status-icon', typeClassNames[type], {
        [statusClassNames[status]]: status
      })}
    >
      {title && <title>{title}</title>}
    </Icon>
  ) : null;
}
