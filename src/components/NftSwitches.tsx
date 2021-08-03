import { FormControlLabel, Switch } from '@material-ui/core';

type NftSwichesProps = {
  profilePictureOn: boolean;
  setProfilePictureOn: React.Dispatch<React.SetStateAction<boolean>>;
  bannerOn: boolean;
  setBannerOn: React.Dispatch<React.SetStateAction<boolean>>;
};

function NftSwitches({
  profilePictureOn,
  setProfilePictureOn,
  bannerOn,
  setBannerOn
}: NftSwichesProps) {
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={profilePictureOn}
            onChange={() =>
              setProfilePictureOn((prev) => {
                if (prev && !bannerOn) setBannerOn(true);
                return !prev;
              })
            }
            color="primary"
            name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        }
        label="Display NFT in profile picture"
      />
      <FormControlLabel
        control={
          <Switch
            checked={bannerOn}
            onChange={() =>
              setBannerOn((prev) => {
                if (prev && !profilePictureOn) setProfilePictureOn(true);
                return !prev;
              })
            }
            color="primary"
            name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        }
        label="Display NFT in banner"
      />
    </>
  );
}

export default NftSwitches;
