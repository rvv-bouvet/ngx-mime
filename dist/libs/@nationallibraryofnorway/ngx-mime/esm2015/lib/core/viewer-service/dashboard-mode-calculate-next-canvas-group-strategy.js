import { Direction } from '../models/direction';
import { ViewingDirection } from '../models/viewing-direction';
export class DashboardModeCalculateNextCanvasGroupStrategy {
    calculateNextCanvasGroup(criteria) {
        const speed = criteria.speed;
        const direction = criteria.direction;
        const currentCanvasGroupIndex = criteria.currentCanvasGroupIndex;
        const currentCanvasGroupCenter = criteria.currentCanvasGroupCenter;
        let nextCanvasGroup;
        let canvasGroupDelta = this.calculateNumberOfCanvasGroupsToGo(speed);
        if (canvasGroupDelta === 0) {
            nextCanvasGroup = currentCanvasGroupCenter;
        }
        else {
            canvasGroupDelta =
                direction === Direction.LEFT ? canvasGroupDelta : canvasGroupDelta * -1;
            nextCanvasGroup =
                criteria.viewingDirection === ViewingDirection.LTR
                    ? currentCanvasGroupIndex + canvasGroupDelta
                    : currentCanvasGroupIndex - canvasGroupDelta;
        }
        return nextCanvasGroup;
    }
    calculateNumberOfCanvasGroupsToGo(speed) {
        if (speed < 500) {
            return 0;
        }
        else if (speed >= 500 && speed < 1500) {
            return 1;
        }
        else if (speed >= 1500 && speed < 2500) {
            return 3;
        }
        else if (speed >= 2500 && speed < 3500) {
            return 5;
        }
        else {
            return 10;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLW1vZGUtY2FsY3VsYXRlLW5leHQtY2FudmFzLWdyb3VwLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvcmUvdmlld2VyLXNlcnZpY2UvZGFzaGJvYXJkLW1vZGUtY2FsY3VsYXRlLW5leHQtY2FudmFzLWdyb3VwLXN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQU0vRCxNQUFNLE9BQU8sNkNBQTZDO0lBRXhELHdCQUF3QixDQUFDLFFBQWlDO1FBQ3hELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDN0IsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUNyQyxNQUFNLHVCQUF1QixHQUFHLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQztRQUNqRSxNQUFNLHdCQUF3QixHQUFHLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQztRQUVuRSxJQUFJLGVBQXVCLENBQUM7UUFDNUIsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsaUNBQWlDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckUsSUFBSSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUU7WUFDMUIsZUFBZSxHQUFHLHdCQUF3QixDQUFDO1NBQzVDO2FBQU07WUFDTCxnQkFBZ0I7Z0JBQ2QsU0FBUyxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMxRSxlQUFlO2dCQUNiLFFBQVEsQ0FBQyxnQkFBZ0IsS0FBSyxnQkFBZ0IsQ0FBQyxHQUFHO29CQUNoRCxDQUFDLENBQUMsdUJBQXVCLEdBQUcsZ0JBQWdCO29CQUM1QyxDQUFDLENBQUMsdUJBQXVCLEdBQUcsZ0JBQWdCLENBQUM7U0FDbEQ7UUFFRCxPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDO0lBRU8saUNBQWlDLENBQUMsS0FBYTtRQUNyRCxJQUFJLEtBQUssR0FBRyxHQUFHLEVBQUU7WUFDZixPQUFPLENBQUMsQ0FBQztTQUNWO2FBQU0sSUFBSSxLQUFLLElBQUksR0FBRyxJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUU7WUFDdkMsT0FBTyxDQUFDLENBQUM7U0FDVjthQUFNLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLEdBQUcsSUFBSSxFQUFFO1lBQ3hDLE9BQU8sQ0FBQyxDQUFDO1NBQ1Y7YUFBTSxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxHQUFHLElBQUksRUFBRTtZQUN4QyxPQUFPLENBQUMsQ0FBQztTQUNWO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQztTQUNYO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL2RpcmVjdGlvbic7XG5pbXBvcnQgeyBWaWV3aW5nRGlyZWN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL3ZpZXdpbmctZGlyZWN0aW9uJztcbmltcG9ydCB7XG4gIENhbGN1bGF0ZU5leHRDYW52YXNHcm91cFN0cmF0ZWd5LFxuICBOZXh0Q2FudmFzR3JvdXBDcml0ZXJpYVxufSBmcm9tICcuL2NhbGN1bGF0ZS1uZXh0LWNhbnZhcy1ncm91cC1zdHJhdGVneSc7XG5cbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRNb2RlQ2FsY3VsYXRlTmV4dENhbnZhc0dyb3VwU3RyYXRlZ3lcbiAgaW1wbGVtZW50cyBDYWxjdWxhdGVOZXh0Q2FudmFzR3JvdXBTdHJhdGVneSB7XG4gIGNhbGN1bGF0ZU5leHRDYW52YXNHcm91cChjcml0ZXJpYTogTmV4dENhbnZhc0dyb3VwQ3JpdGVyaWEpOiBudW1iZXIge1xuICAgIGNvbnN0IHNwZWVkID0gY3JpdGVyaWEuc3BlZWQ7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gY3JpdGVyaWEuZGlyZWN0aW9uO1xuICAgIGNvbnN0IGN1cnJlbnRDYW52YXNHcm91cEluZGV4ID0gY3JpdGVyaWEuY3VycmVudENhbnZhc0dyb3VwSW5kZXg7XG4gICAgY29uc3QgY3VycmVudENhbnZhc0dyb3VwQ2VudGVyID0gY3JpdGVyaWEuY3VycmVudENhbnZhc0dyb3VwQ2VudGVyO1xuXG4gICAgbGV0IG5leHRDYW52YXNHcm91cDogbnVtYmVyO1xuICAgIGxldCBjYW52YXNHcm91cERlbHRhID0gdGhpcy5jYWxjdWxhdGVOdW1iZXJPZkNhbnZhc0dyb3Vwc1RvR28oc3BlZWQpO1xuICAgIGlmIChjYW52YXNHcm91cERlbHRhID09PSAwKSB7XG4gICAgICBuZXh0Q2FudmFzR3JvdXAgPSBjdXJyZW50Q2FudmFzR3JvdXBDZW50ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbnZhc0dyb3VwRGVsdGEgPVxuICAgICAgICBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5MRUZUID8gY2FudmFzR3JvdXBEZWx0YSA6IGNhbnZhc0dyb3VwRGVsdGEgKiAtMTtcbiAgICAgIG5leHRDYW52YXNHcm91cCA9XG4gICAgICAgIGNyaXRlcmlhLnZpZXdpbmdEaXJlY3Rpb24gPT09IFZpZXdpbmdEaXJlY3Rpb24uTFRSXG4gICAgICAgICAgPyBjdXJyZW50Q2FudmFzR3JvdXBJbmRleCArIGNhbnZhc0dyb3VwRGVsdGFcbiAgICAgICAgICA6IGN1cnJlbnRDYW52YXNHcm91cEluZGV4IC0gY2FudmFzR3JvdXBEZWx0YTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dENhbnZhc0dyb3VwO1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVOdW1iZXJPZkNhbnZhc0dyb3Vwc1RvR28oc3BlZWQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHNwZWVkIDwgNTAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2UgaWYgKHNwZWVkID49IDUwMCAmJiBzcGVlZCA8IDE1MDApIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoc3BlZWQgPj0gMTUwMCAmJiBzcGVlZCA8IDI1MDApIHtcbiAgICAgIHJldHVybiAzO1xuICAgIH0gZWxzZSBpZiAoc3BlZWQgPj0gMjUwMCAmJiBzcGVlZCA8IDM1MDApIHtcbiAgICAgIHJldHVybiA1O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMTA7XG4gICAgfVxuICB9XG59XG4iXX0=