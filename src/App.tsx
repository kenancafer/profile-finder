import {
  TextField,
  InputAdornment,
  IconButton,
  Container,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./css/style.css";
import { useState } from "react";
import { UserCard } from "./UserCard";

function App() {
  const [userName, setUserName] = useState("kenancafer");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchData = async (userName: string) => {
    setLoading(true);
    setError(null);
    setUserData(null);
    try {
      const res = await fetch(`https://api.github.com/users/${userName}`);
      if (!res.ok) {
        throw new Error("Kullanıcı bulunamadı!");
      }
      const data = await res.json();
      setUserData(data);
      setUserName("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Bir hata oluştu.");
      }
    } finally {
      setLoading(false);
    }
  };
  function handleSubmit() {
    fetchData(userName);
  }

  if (loading) {
    return <h1> Yükleniyor, Lütfen bekleyiniz...</h1>;
  }

  return (
    <>
      <Container fixed>
        <Box display="flex" justifyContent="center" alignItems="center">
          <TextField
            label="Kullanıcı adı"
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            sx={{ mt: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSubmit}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: 10 }}
        >
          {error && <h2 style={{ color: "red" }}>{error}</h2>}
          {userData !== null ? <UserCard user={userData} /> : null}
        </Box>
      </Container>
    </>
  );
}

export default App;
