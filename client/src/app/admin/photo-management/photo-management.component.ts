import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Photo } from 'src/app/_models/photo';
import { AdminService } from 'src/app/_services/admin.service';
import { ConfirmService } from 'src/app/_services/confirm.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css'],
})
export class PhotoManagementComponent implements OnInit {
  photos: Photo[];

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private confirmService: ConfirmService
  ) {}

  ngOnInit(): void {
    this.loadPhotosForApproval();
  }

  loadPhotosForApproval(): void {
    this.adminService.getPhotosForApproval().subscribe((photos) => {
      this.photos = photos;
    });
  }

  approvePhoto(photoId: number): void {
    this.adminService.approvePhoto(photoId).subscribe(() => {
      this.photos.splice(
        this.photos.findIndex((x) => x.id === photoId),
        1
      );
      this.toastr.success('Photo approved successfully', 'Success!');
    });
  }

  rejectPhoto(photoId: number): void {
    this.confirmService
      .confirm('Confirm Reject', 'Are you sure you want to reject this photo? This cannot be undone.')
      .subscribe((result) => {
        if (result) {
          this.adminService.rejectPhoto(photoId).subscribe(() => {
            this.photos.splice(
              this.photos.findIndex((x) => x.id === photoId),
              1
            );
            this.toastr.success('Photo rejected successfully', 'Success!');
          });
        }
      });
  }
}
