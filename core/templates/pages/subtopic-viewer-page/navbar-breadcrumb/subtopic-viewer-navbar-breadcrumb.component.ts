// Copyright 2018 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Component for the navbar breadcrumb of the subtopic viewer.
 */

import { Component, OnInit } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';

import { ClassroomDomainConstants } from
  'domain/classroom/classroom-domain.constants.ts';
import { ReadOnlySubtopicPageData } from
  'domain/subtopic_viewer/ReadOnlySubtopicPageObjectFactory';
import { SubtopicViewerBackendApiService } from
  'domain/subtopic_viewer/subtopic-viewer-backend-api.service';
import { UrlInterpolationService } from
  'domain/utilities/url-interpolation.service';
import { UrlService } from 'services/contextual/url.service';

@Component({
  selector: 'subtopic-viewer-navbar-breadcrumb',
  templateUrl: './subtopic-viewer-navbar-breadcrumb.component.html',
  styleUrls: []
})
export class SubtopicViewerNavbarBreadcrumbComponent implements OnInit {
  topicName: string;
  subtopicTitle: string;
  constructor(
    private subtopicViewerBackendApiService: SubtopicViewerBackendApiService,
    private urlInterpolationService: UrlInterpolationService,
    private urlService: UrlService
  ) {}
  ngOnInit(): void {
    this.topicName = this.urlService.getTopicNameFromLearnerUrl();
    this.subtopicViewerBackendApiService.fetchSubtopicData(this.topicName,
      this.urlService.getSubtopicIdFromUrl()).then(
      (subtopicDataObject: ReadOnlySubtopicPageData) => {
        this.subtopicTitle = subtopicDataObject.getSubtopicTitle();
      });
  }
  getTopicUrl(): string {
    return this.urlInterpolationService.interpolateUrl(
      ClassroomDomainConstants.TOPIC_VIEWER_URL_TEMPLATE, {
        topic_name: this.topicName
      });
  }
}

angular.module('oppia').directive(
  'subtopicViewerNavbarBreadcrumb', downgradeComponent(
    {component: SubtopicViewerNavbarBreadcrumbComponent}));