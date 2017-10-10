import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../models/Candidate';
import { MatDialog, MatDialogRef } from '@angular/material';
import {EmailService} from "../../services/email.service";
import { CandidateService } from '../../services/candidate.service';
//import {window} from 'rxjs/operator/window';

@Component({
  selector: 'app-email-manager',
  templateUrl: './email-manager.component.html',
  styleUrls: ['./email-manager.component.css']
})
export class EmailManagerComponent implements OnInit {
  githubId: string;
  candidates: any;
  candidate: Candidate;
  devEmail: string;
  devEmailContent: string;
  subscription: any;
  url: string;

  constructor(
    public dialogRef: MatDialogRef<EmailManagerComponent>,
    private emailService: EmailService,
    public candidateService: CandidateService) { }

  ngOnInit() {
    this.githubId = document.getElementById("identifier2").innerHTML.toLowerCase();
    this.url = window.location.origin + '/nfuse';
    this.subscription = this.candidateService.getCandidates().subscribe(candidatesList => {
      for (let ca of candidatesList) {
        if (ca.githubID == this.githubId) {
          this.candidate = ca;
          // NOTE: do not put spaces before or after /n new lines because it distorts text sizes in the email
          this.devEmailContent = 'Dear Development Manager,\n\n' + ca.name + ' has finished their coding problem. Please forward this email to all potential reviewers ' +
            'who would be interested in reviewing this candidate and providing technical feedback.\nThe reviewers can assign themselves ' +
            'to this candidate using this link:\n' + this.url + '/reviewCandidate/' + ca.$key + '\n\nAfter the reviewers have finished ' +
            'assessing the candidate\'s solution they can submit their technical comments and feedback using the following link:\n'
            + this.url + '/feedback/' + ca.$key   + '\n\n' + 'MYOB Recruitment Team';
        }
      }
    })
  }

  /**
   * Send email to development manager
   */
  sentEmail(){
    this.candidate.progressStatus = "Being Reviewed";
    this.candidateService.editCandidate(this.candidate.$key,this.candidate);

    this.emailService.sendDevManagerEmail(this.devEmail, this.devEmailContent);
    this.onCloseCancel();
    window.alert("The email was sent successfully");
  }

  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

  /**
   * Destroy firebase subscription
   */
  ngOnDestroy(): void {
    if (this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }
}
