import React from "react";

const ProfilePictureCard = (props) => {
  return (
    <div class="col-xl-4">
      <div className="card mb-4 mb-xl-0">
        <div className="card-header">Profile Picture</div>
        <div className="card-body text-center">
          <img
            className="img-account-profile rounded-circle mb-2"
            src={props.assetURL}
            alt=""
          />
          <div className="small font-italic text-muted mb-4">
            JPG or PNG no larger than 5 MB
          </div>
          <button className="btn btn-primary" type="button">
            Upload new image
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureCard;
