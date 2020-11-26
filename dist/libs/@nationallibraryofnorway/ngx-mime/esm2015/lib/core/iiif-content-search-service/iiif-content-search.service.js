import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, throwError } from 'rxjs';
import { distinctUntilChanged, finalize } from 'rxjs/operators';
import { SearchResultBuilder } from './../builders/search-result.builder';
import { SearchResult } from './../models/search-result';
export class IiifContentSearchService {
    constructor(http) {
        this.http = http;
        this._currentSearchResult = new BehaviorSubject(new SearchResult({}));
        this._searching = new BehaviorSubject(false);
        this._currentQ = new Subject();
        this._selected = new BehaviorSubject(null);
    }
    destroy() {
        this._currentSearchResult.next(new SearchResult({}));
        this._selected.next(null);
    }
    get onQChange() {
        return this._currentQ.asObservable().pipe(distinctUntilChanged());
    }
    get onChange() {
        return this._currentSearchResult.asObservable();
    }
    get isSearching() {
        return this._searching.asObservable();
    }
    get onSelected() {
        return this._selected.asObservable();
    }
    search(manifest, q) {
        this._currentQ.next(q);
        this._selected.next(null);
        if (q.length === 0) {
            this._currentSearchResult.next(new SearchResult());
            return;
        }
        if (!manifest.service || manifest.service === null) {
            return;
        }
        this._searching.next(true);
        this.http
            .get(`${manifest.service.id}?q=${q}`)
            .pipe(finalize(() => this._searching.next(false)))
            .subscribe((res) => this._currentSearchResult.next(this.extractData(q, manifest, res)), (err) => this.handleError);
    }
    selected(hit) {
        this._selected.next(hit);
    }
    extractData(q, manifest, iiifSearchResult) {
        return new SearchResultBuilder(q, manifest, iiifSearchResult).build();
    }
    handleError(err) {
        let errMsg;
        if (err.error instanceof Error) {
            errMsg = err.error.message;
        }
        else {
            errMsg = err.error;
        }
        return throwError(errMsg);
    }
}
IiifContentSearchService.decorators = [
    { type: Injectable }
];
IiifContentSearchService.ctorParameters = () => [
    { type: HttpClient }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWlpZi1jb250ZW50LXNlYXJjaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3Jvbm55bS9UZW1wL25neC1taW1lL2xpYnMvbmd4LW1pbWUvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvcmUvaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQXFCLE1BQU0sc0JBQXNCLENBQUM7QUFDckUsT0FBTyxFQUFjLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFLekQsTUFBTSxPQUFPLHdCQUF3QjtJQVFuQyxZQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBUDFCLHlCQUFvQixHQUEwQixJQUFJLGVBQWUsQ0FFekUsSUFBSSxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNkLGVBQVUsR0FBcUIsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7UUFDbkUsY0FBUyxHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQ25ELGNBQVMsR0FBaUIsSUFBSSxlQUFlLENBQU0sSUFBSSxDQUFDLENBQUM7SUFFNUIsQ0FBQztJQUV4QyxPQUFPO1FBQ0wsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxNQUFNLENBQUMsUUFBa0IsRUFBRSxDQUFTO1FBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksRUFBRSxDQUFDLENBQUM7WUFDbkQsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDbEQsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUk7YUFDTixHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQzthQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDakQsU0FBUyxDQUNSLENBQUMsR0FBcUIsRUFBRSxFQUFFLENBQ3hCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQ3BFLENBQUMsR0FBc0IsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FDN0MsQ0FBQztJQUNOLENBQUM7SUFFTSxRQUFRLENBQUMsR0FBUTtRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRU8sV0FBVyxDQUNqQixDQUFTLEVBQ1QsUUFBa0IsRUFDbEIsZ0JBQWtDO1FBRWxDLE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEUsQ0FBQztJQUVPLFdBQVcsQ0FBQyxHQUE0QjtRQUM5QyxJQUFJLE1BQWMsQ0FBQztRQUNuQixJQUFJLEdBQUcsQ0FBQyxLQUFLLFlBQVksS0FBSyxFQUFFO1lBQzlCLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUM1QjthQUFNO1lBQ0wsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7U0FDcEI7UUFDRCxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QixDQUFDOzs7WUF6RUYsVUFBVTs7O1lBVkYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgQmVoYXZpb3JTdWJqZWN0LCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmluYWxpemUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IElpaWZTZWFyY2hSZXN1bHQgfSBmcm9tICcuLy4uL21vZGVscy9paWlmLXNlYXJjaC1yZXN1bHQnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0QnVpbGRlciB9IGZyb20gJy4vLi4vYnVpbGRlcnMvc2VhcmNoLXJlc3VsdC5idWlsZGVyJztcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4vLi4vbW9kZWxzL3NlYXJjaC1yZXN1bHQnO1xuaW1wb3J0IHsgSGl0IH0gZnJvbSAnLi8uLi9tb2RlbHMvaGl0JztcbmltcG9ydCB7IE1hbmlmZXN0IH0gZnJvbSAnLi8uLi9tb2RlbHMvbWFuaWZlc3QnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIF9jdXJyZW50U2VhcmNoUmVzdWx0OiBTdWJqZWN0PFNlYXJjaFJlc3VsdD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFxuICAgIFNlYXJjaFJlc3VsdFxuICA+KG5ldyBTZWFyY2hSZXN1bHQoe30pKTtcbiAgcHJvdGVjdGVkIF9zZWFyY2hpbmc6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcHJvdGVjdGVkIF9jdXJyZW50UTogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICBwcm90ZWN0ZWQgX3NlbGVjdGVkOiBTdWJqZWN0PEhpdD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhpdD4obnVsbCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5fY3VycmVudFNlYXJjaFJlc3VsdC5uZXh0KG5ldyBTZWFyY2hSZXN1bHQoe30pKTtcbiAgICB0aGlzLl9zZWxlY3RlZC5uZXh0KG51bGwpO1xuICB9XG5cbiAgZ2V0IG9uUUNoYW5nZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50US5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0IG9uQ2hhbmdlKCk6IE9ic2VydmFibGU8U2VhcmNoUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTZWFyY2hSZXN1bHQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgaXNTZWFyY2hpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlYXJjaGluZy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBvblNlbGVjdGVkKCk6IE9ic2VydmFibGU8SGl0PiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHVibGljIHNlYXJjaChtYW5pZmVzdDogTWFuaWZlc3QsIHE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2N1cnJlbnRRLm5leHQocSk7XG4gICAgdGhpcy5fc2VsZWN0ZWQubmV4dChudWxsKTtcbiAgICBpZiAocS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRTZWFyY2hSZXN1bHQubmV4dChuZXcgU2VhcmNoUmVzdWx0KCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIW1hbmlmZXN0LnNlcnZpY2UgfHwgbWFuaWZlc3Quc2VydmljZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zZWFyY2hpbmcubmV4dCh0cnVlKTtcbiAgICB0aGlzLmh0dHBcbiAgICAgIC5nZXQoYCR7bWFuaWZlc3Quc2VydmljZS5pZH0/cT0ke3F9YClcbiAgICAgIC5waXBlKGZpbmFsaXplKCgpID0+IHRoaXMuX3NlYXJjaGluZy5uZXh0KGZhbHNlKSkpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAocmVzOiBJaWlmU2VhcmNoUmVzdWx0KSA9PlxuICAgICAgICAgIHRoaXMuX2N1cnJlbnRTZWFyY2hSZXN1bHQubmV4dCh0aGlzLmV4dHJhY3REYXRhKHEsIG1hbmlmZXN0LCByZXMpKSxcbiAgICAgICAgKGVycjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHRoaXMuaGFuZGxlRXJyb3JcbiAgICAgICk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0ZWQoaGl0OiBIaXQpIHtcbiAgICB0aGlzLl9zZWxlY3RlZC5uZXh0KGhpdCk7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhY3REYXRhKFxuICAgIHE6IHN0cmluZyxcbiAgICBtYW5pZmVzdDogTWFuaWZlc3QsXG4gICAgaWlpZlNlYXJjaFJlc3VsdDogSWlpZlNlYXJjaFJlc3VsdFxuICApOiBTZWFyY2hSZXN1bHQge1xuICAgIHJldHVybiBuZXcgU2VhcmNoUmVzdWx0QnVpbGRlcihxLCBtYW5pZmVzdCwgaWlpZlNlYXJjaFJlc3VsdCkuYnVpbGQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyOiBIdHRwRXJyb3JSZXNwb25zZSB8IGFueSkge1xuICAgIGxldCBlcnJNc2c6IHN0cmluZztcbiAgICBpZiAoZXJyLmVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIGVyck1zZyA9IGVyci5lcnJvci5tZXNzYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJNc2cgPSBlcnIuZXJyb3I7XG4gICAgfVxuICAgIHJldHVybiB0aHJvd0Vycm9yKGVyck1zZyk7XG4gIH1cbn1cbiJdfQ==