import { Card, Typography, Button } from "@material-ui/core";

interface Props {
  name: string;
  size: string;
  extension: string;
}

export default function FileInfo(props: Props) {
  return (
    <Card>
      <Typography variant="h4">Connect your wallet</Typography>
    </Card>
  );
}
