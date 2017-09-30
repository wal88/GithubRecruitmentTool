import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Reviewer } from '../../models/Reviewer';
import { Router } from '@angular/router';
import { ReviewerService } from '../../services/reviewer.service';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../../models/Candidate';
import { GithubService} from "../../services/github.service";


@Component({
  selector: 'app-add-reviewers',
  templateUrl: './add-reviewers.component.html',
  styleUrls: ['./add-reviewers.component.css']
})
export class AddReviewersComponent implements OnInit {
  reviewerGithubID: string;
  reviewer: Reviewer;
  githubId: string;
  reviewerList: any[];
  candidate: Candidate;

  constructor(public dialogRef: MdDialogRef<AddReviewersComponent>,
    public reviewerService: ReviewerService,
    public candidateService: CandidateService,
    public githubService: GithubService) {
  }

  ngOnInit() {
    this.githubId = document.getElementById("identifier").innerHTML.toLowerCase();
    this.reviewerList = this.candidateService.getReviewerList(this.githubId);
  }

  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

  addReviewer() {
    // For database
    //var identifierDiv = document.getElementById("identifier");
    //var gid = identifierDiv.innerHTML;

    console.log('this.githubId is: ' +this.githubId);
    this.reviewer = {
      name: '',
      email: ''.toLowerCase(),
      githubID: this.reviewerGithubID.toLowerCase(),
    };
    this.candidate = this.candidateService.addReviewertoCandidate(this.githubId, this.reviewer.githubID);
    this.reviewerList = this.candidateService.getReviewerList(this.githubId);

    // adding reviewer as collaborator.
    this.githubService.addCollaborator(this.candidate.repositoryName, this.reviewer.githubID).subscribe(res => {
      console.log(res);
    }).unsubscribe();

    // Check  the candidate status to being review
    // Kick candidate out of the repo
    this.githubService.removeCandidateFromRepo(this.candidate);
    this.candidateService.updateCandidateStatus(this.candidate.$key, 'Being reviewed');
  }
}
