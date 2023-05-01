/*
Copyright 2019 The Tekton Authors
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

import { isRunning } from ".";

export function getStatus(resource) {
  const { conditions = [] } = resource.status || {};
  return conditions.find(condition => condition.type === 'Succeeded') || {};
}

export function getStatusClass(resource){
  let {status,reason} = getStatus(resource)
  let hasWarning = false;
  let isCustomTask = false;
  let statusClass;
  if (!status){
    statusClass = 'skipped';
  } else if (status === 'Unknown' && reason === 'Pending'){
    statusClass = 'pending';
  } else if (
    status === 'True' ||
    (status === 'terminated' && reason === 'Completed')
  ) {
    statusClass = hasWarning ? 'warning' : 'success';
  } else if (
    status === 'False' &&
    (reason === 'PipelineRunCancelled' ||
      reason === 'Cancelled' ||
      reason === 'TaskRunCancelled')
  ) {
    statusClass = 'cancelled';
  } else if (
    status === 'False' ||
    status === 'cancelled' ||
    status === 'terminated' ||
    (status === 'Unknown' && reason === 'PipelineRunCouldntCancel')
  ) {
    statusClass = 'error';
  } else if (
    isRunning(reason, status) ||
    (isCustomTask && status === 'Unknown')
  ) {
    statusClass = 'running';
  }

  return statusClass
}
