import { Manifest } from '../models/manifest';
import { BuilderUtils } from './builder-utils';
import { SequenceBuilder } from './sequence.builder';
import { ServiceBuilder } from './service.builder';
import { MetadataBuilder } from './metadata.builder';
import { StructureBuilder } from './structure.builder';
import { TileSourceBuilder } from './tile-source.builder';
export class ManifestBuilder {
    constructor(data) {
        this.data = data;
    }
    build() {
        const sequences = new SequenceBuilder(this.data.sequences).build();
        return new Manifest({
            context: BuilderUtils.extractContext(this.data),
            type: BuilderUtils.extracType(this.data),
            id: BuilderUtils.extractId(this.data),
            viewingDirection: BuilderUtils.extractViewingDirection(this.data),
            label: this.data.label,
            metadata: new MetadataBuilder(this.data.metadata).build(),
            license: this.data.license,
            logo: this.data.logo,
            attribution: this.data.attribution,
            service: new ServiceBuilder(this.data.service).build(),
            sequences: sequences,
            structures: new StructureBuilder(this.data.structures, sequences).build(),
            tileSource: new TileSourceBuilder(this.data.sequences).build(),
            viewingHint: this.data.viewingHint
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuaWZlc3QuYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9yb25ueW0vVGVtcC9uZ3gtbWltZS9saWJzL25neC1taW1lL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2J1aWxkZXJzL21hbmlmZXN0LmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBWSxNQUFNLG9CQUFvQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxNQUFNLE9BQU8sZUFBZTtJQUMxQixZQUFvQixJQUFTO1FBQVQsU0FBSSxHQUFKLElBQUksQ0FBSztJQUFHLENBQUM7SUFFakMsS0FBSztRQUNILE1BQU0sU0FBUyxHQUFlLElBQUksZUFBZSxDQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FDcEIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVWLE9BQU8sSUFBSSxRQUFRLENBQUM7WUFDbEIsT0FBTyxFQUFFLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMvQyxJQUFJLEVBQUUsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3hDLEVBQUUsRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDckMsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDakUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztZQUN0QixRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDekQsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztZQUMxQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQ3BCLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVc7WUFDbEMsT0FBTyxFQUFFLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ3RELFNBQVMsRUFBRSxTQUFTO1lBQ3BCLFVBQVUsRUFBRSxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUN6RSxVQUFVLEVBQUUsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUM5RCxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXO1NBQ25DLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hbmlmZXN0LCBTZXF1ZW5jZSB9IGZyb20gJy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBCdWlsZGVyVXRpbHMgfSBmcm9tICcuL2J1aWxkZXItdXRpbHMnO1xuaW1wb3J0IHsgU2VxdWVuY2VCdWlsZGVyIH0gZnJvbSAnLi9zZXF1ZW5jZS5idWlsZGVyJztcbmltcG9ydCB7IFNlcnZpY2VCdWlsZGVyIH0gZnJvbSAnLi9zZXJ2aWNlLmJ1aWxkZXInO1xuaW1wb3J0IHsgTWV0YWRhdGFCdWlsZGVyIH0gZnJvbSAnLi9tZXRhZGF0YS5idWlsZGVyJztcbmltcG9ydCB7IFN0cnVjdHVyZUJ1aWxkZXIgfSBmcm9tICcuL3N0cnVjdHVyZS5idWlsZGVyJztcbmltcG9ydCB7IFRpbGVTb3VyY2VCdWlsZGVyIH0gZnJvbSAnLi90aWxlLXNvdXJjZS5idWlsZGVyJztcblxuZXhwb3J0IGNsYXNzIE1hbmlmZXN0QnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YTogYW55KSB7fVxuXG4gIGJ1aWxkKCk6IE1hbmlmZXN0IHtcbiAgICBjb25zdCBzZXF1ZW5jZXM6IFNlcXVlbmNlW10gPSBuZXcgU2VxdWVuY2VCdWlsZGVyKFxuICAgICAgdGhpcy5kYXRhLnNlcXVlbmNlc1xuICAgICkuYnVpbGQoKTtcblxuICAgIHJldHVybiBuZXcgTWFuaWZlc3Qoe1xuICAgICAgY29udGV4dDogQnVpbGRlclV0aWxzLmV4dHJhY3RDb250ZXh0KHRoaXMuZGF0YSksXG4gICAgICB0eXBlOiBCdWlsZGVyVXRpbHMuZXh0cmFjVHlwZSh0aGlzLmRhdGEpLFxuICAgICAgaWQ6IEJ1aWxkZXJVdGlscy5leHRyYWN0SWQodGhpcy5kYXRhKSxcbiAgICAgIHZpZXdpbmdEaXJlY3Rpb246IEJ1aWxkZXJVdGlscy5leHRyYWN0Vmlld2luZ0RpcmVjdGlvbih0aGlzLmRhdGEpLFxuICAgICAgbGFiZWw6IHRoaXMuZGF0YS5sYWJlbCxcbiAgICAgIG1ldGFkYXRhOiBuZXcgTWV0YWRhdGFCdWlsZGVyKHRoaXMuZGF0YS5tZXRhZGF0YSkuYnVpbGQoKSxcbiAgICAgIGxpY2Vuc2U6IHRoaXMuZGF0YS5saWNlbnNlLFxuICAgICAgbG9nbzogdGhpcy5kYXRhLmxvZ28sXG4gICAgICBhdHRyaWJ1dGlvbjogdGhpcy5kYXRhLmF0dHJpYnV0aW9uLFxuICAgICAgc2VydmljZTogbmV3IFNlcnZpY2VCdWlsZGVyKHRoaXMuZGF0YS5zZXJ2aWNlKS5idWlsZCgpLFxuICAgICAgc2VxdWVuY2VzOiBzZXF1ZW5jZXMsXG4gICAgICBzdHJ1Y3R1cmVzOiBuZXcgU3RydWN0dXJlQnVpbGRlcih0aGlzLmRhdGEuc3RydWN0dXJlcywgc2VxdWVuY2VzKS5idWlsZCgpLFxuICAgICAgdGlsZVNvdXJjZTogbmV3IFRpbGVTb3VyY2VCdWlsZGVyKHRoaXMuZGF0YS5zZXF1ZW5jZXMpLmJ1aWxkKCksXG4gICAgICB2aWV3aW5nSGludDogdGhpcy5kYXRhLnZpZXdpbmdIaW50XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==