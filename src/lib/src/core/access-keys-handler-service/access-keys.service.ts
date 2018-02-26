import { Injectable, OnDestroy } from '@angular/core';

import { ViewerService } from '../viewer-service/viewer.service';
import { PageService } from '../page-service/page-service';
import { ContentSearchDialogService } from '../../content-search-dialog/content-search-dialog.service';
import { ContentsDialogService } from '../../contents-dialog/contents-dialog.service';
import { ModeService } from '../mode-service/mode.service';
import { ViewerMode } from '../models/viewer-mode';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { Manifest } from '../models/manifest';
import { MimeDomHelper } from '../mime-dom-helper';
import { AccessKeys } from '../models/AccessKeys';
import { ContentSearchNavigationService } from '../navigation/content-search-navigation-service/content-search-navigation.service';
import { IiifContentSearchService } from '../iiif-content-search-service/iiif-content-search.service';
import { SearchResult } from '../models/search-result';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

@Injectable()
export class AccessKeysService implements OnDestroy {
  private isSearchable = false;
  private hasHits = false;
  private disabledKeys: number[] = [];
  private destroyed: Subject<void> = new Subject();

  constructor(
    private viewerService: ViewerService,
    private pageService: PageService,
    private modeService: ModeService,
    private iiifManifestService: IiifManifestService,
    private iiifContentSearchService: IiifContentSearchService,
    private contentSearchDialogService: ContentSearchDialogService,
    private contentsDialogService: ContentsDialogService,
    private mimeDomHelper: MimeDomHelper,
    private contentSearchNavigationService: ContentSearchNavigationService
  ) {
    this.iiifManifestService.currentManifest
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe((manifest: Manifest) => {
      this.isSearchable = this.isManifestSearchable(manifest);
    });

    this.iiifContentSearchService.onChange
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe((result: SearchResult) => {
      this.hasHits = result.hits.length > 0;
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  public handleKeyEvents(event: KeyboardEvent) {
    const accessKeys = new AccessKeys(event);
    if (!this.isKeyDisabled(event.keyCode)) {
      if (accessKeys.isArrowLeftKeys()) {
        this.goToPreviousPage();
      } else if (accessKeys.isArrowRightKeys()) {
        this.goToNextPage();
      } else if (accessKeys.isFirstPageKeys()) {
        this.goToFirstPage();
      } else if (accessKeys.isLastPageKeys()) {
        this.goToLastPage();
      } else if (accessKeys.isNextHitKeys() && this.hasHits) {
        this.goToNextHit();
      } else if (accessKeys.isPreviousHitKeys() && this.hasHits) {
        this.goToPreviousHit();
      } else if (accessKeys.isFullscreenKeys()) {
        this.toggleFullscreen();
      } else if (accessKeys.isSearchDialogKeys() && this.isSearchable) {
        this.toggleSearchDialog();
      } else if (accessKeys.isContentsDialogKeys()) {
        this.toggleContentsDialog();
      } else if (accessKeys.isResetSearchKeys()) {
        this.resetSearch();
      } else if (accessKeys.isPageDownKeys()) {
        this.goToNextPage();
      } else if (accessKeys.isPageUpKeys()) {
        this.goToPreviousPage();
      } else if (accessKeys.isZoomInKeys()) {
        this.zoomIn();
      } else if (accessKeys.isZoomOutKeys()) {
        this.zoomOut();
      } else if (accessKeys.isZoomHomeKeys()) {
        this.zoomHome();
      }
    }
  }

  private goToNextPage() {
    if (!this.isZoomedIn() && this.pageService.currentPage < this.pageService.numberOfPages) {
      this.viewerService.goToNextPage();
    }
  }

  private goToPreviousPage() {
    if (!this.isZoomedIn() && this.pageService.currentPage > 0) {
      this.viewerService.goToPreviousPage();
    }
  }

  private goToFirstPage() {
    this.viewerService.goToPage(0, false);
  }

  private goToLastPage() {
    this.viewerService.goToPage(this.pageService.numberOfPages - 1, false);
  }

  private goToNextHit() {
    this.contentSearchNavigationService.goToNextHitPage();
  }

  private goToPreviousHit() {
    this.contentSearchNavigationService.goToPreviousHitPage();
  }

  private zoomIn() {
    if (this.modeService.mode === ViewerMode.DASHBOARD) {
      this.modeService.toggleMode();
    } else {
      this.viewerService.zoomIn();
    }
  }

  private zoomOut() {
    if (this.modeService.mode === ViewerMode.PAGE) {
      this.modeService.toggleMode();
    } else if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      this.viewerService.zoomOut();
    }
  }

  private zoomHome() {
    if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      this.viewerService.home();
    }
  }

  private toggleSearchDialog() {
    if (this.modeService.mode === ViewerMode.PAGE || this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      this.modeService.mode = ViewerMode.DASHBOARD;
      this.contentSearchDialogService.open();
    } else {
      if (this.contentSearchDialogService.isOpen()) {
        this.contentSearchDialogService.close();
      } else {
        this.contentSearchDialogService.open();
      }
    }

    this.contentsDialogService.close();
  }

  private toggleContentsDialog() {
    if (this.modeService.mode === ViewerMode.PAGE || this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      this.modeService.mode = ViewerMode.DASHBOARD;
      this.contentsDialogService.open();
    } else {
      if (this.contentsDialogService.isOpen()) {
        this.contentsDialogService.close();
      } else {
        this.contentsDialogService.open();
      }
    }
    this.contentSearchDialogService.close();
  }

  private toggleFullscreen() {
    this.mimeDomHelper.toggleFullscreen();
  }

  private resetSearch() {
    this.iiifContentSearchService.destroy();
  }

  private isManifestSearchable(manifest: Manifest): boolean {
    return manifest.service ? true : false;
  }

  private isZoomedIn(): boolean {
    return this.modeService.mode === ViewerMode.PAGE_ZOOMED;
  }

  private updateDisabledKeys() {
    this.resetDisabledKeys();
    if (this.contentsDialogService.isOpen()) {
      this.disableKeysForContentDialog();
    } else if (this.contentSearchDialogService.isOpen()) {
      this.diableKeysForContentSearchDialog();
    }
  }

  private disableKeysForContentDialog() {
    this.disabledKeys = this.disabledKeys
      .concat(AccessKeys.ARROWLEFT)
      .concat(AccessKeys.ARROWRIGHT);
  }

  private diableKeysForContentSearchDialog() {
    this.disabledKeys = this.disabledKeys
      .concat(AccessKeys.ARROWLEFT)
      .concat(AccessKeys.ARROWRIGHT)
      .concat(AccessKeys.firstPageCodes)
      .concat(AccessKeys.lastPageCodes)
      .concat(AccessKeys.zoomInCodes)
      .concat(AccessKeys.zoomOutCodes)
      .concat(AccessKeys.zoomHomeCodes)
      .concat(AccessKeys.nextHit)
      .concat(AccessKeys.previousHit)
      .concat(AccessKeys.toggleSearchDialogCodes)
      .concat(AccessKeys.toggleContentsDialogCodes)
      .concat(AccessKeys.toggleFullscreenCodes);
  }

  private resetDisabledKeys() {
    this.disabledKeys = [];
  }

  private isKeyDisabled(keyCode: number): boolean {
    this.updateDisabledKeys();
    return this.disabledKeys.indexOf(keyCode) > -1;
  }
}