import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
interface User {
  user: {
    avatar_url: string;
    followers: number;
    following: number;
    public_repos: number;
    name: string;
    created_at: string;
    url: string;
  };
}
export const UserCard: React.FC<User> = ({ user }) => {
  const dateString = user.created_at;
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  const formattedDate = `${day}/${month}/${year}`;

  const firstLetter = user.name.charAt(0);
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {firstLetter}
            </Avatar>
          }
          title={user.name} // isim
          subheader={formattedDate} // ne zaman katıldığı
        />

        <CardMedia
          component="img"
          height="194"
          image={user.avatar_url}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Uploading your project to GitHub is not only part of a software
            development process, but also an opportunity to exert yourself and
            contribute to the community. In each code section, a part of your
            learning and inspiration can be provided. Remember, everything and
            changes you share on this platform can open new doors to your
            projects and career!
          </Typography>
        </CardContent>
        <CardContent>Followers: {user.followers}</CardContent>
        <CardContent>Following: {user.following}</CardContent>
        <CardContent>Public Repos: {user.public_repos}</CardContent>
      </Card>
    </>
  );
};
