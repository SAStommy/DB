import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [website, setWebsite] = useState("");
  const [search, setSearch] = useState("");
 

  const [newName, setNewName] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newWebsite, setNewWebsite] = useState("");

  const [schoolList, setSchoolList] = useState([]);

  const addSchool = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      content: content,
      website: website,
    }).then(() => {
      setSchoolList([
        ...schoolList,
        {
            name: name,
            content: content,
            website: website,
        },
      ]);
    });
  };

  const searchSchool = () => {
    Axios.post("http://localhost:3001/search", {
      name: search,
    }).then((response) => {
      setSchoolList(response.data);
    });
  };

  const getSchool = () => {
    Axios.get("http://localhost:3001/school").then((response) => {
      setSchoolList(response.data);
    });
  };

  const updateSchool = (schoolID) => {
    Axios.put("http://localhost:3001/update", { name: newName, content: newContent, website: newWebsite, schoolID: schoolID }).then(
      (response) => {
        setSchoolList(
          schoolList.map((val) => {
            return val.schoolID === schoolID
              ? {
                  schoolID: val.schoolID,
                  name: newName,
                  content: newContent,
                  website: newWebsite,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteSchool = (schoolID) => {
    Axios.delete(`http://localhost:3001/delete/${schoolID}`).then((response) => {
      setSchoolList(
        schoolList.filter((val) => {
          return val.schoolID !== schoolID;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
      <label>Search:</label>
        <input
          type="text"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>content:</label>
        <input
          type="text"
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
        <label>website:</label>
        <input
          type="text"
          onChange={(event) => {
            setWebsite(event.target.value);
          }}
        />
        <button onClick={addSchool}>Add School</button>
        <button onClick={searchSchool}>Search School</button>
      </div>
      <div className="schools">
        <button onClick={getSchool}>Show School</button>

        {schoolList.map((val, key) => {
          return (
            <div className="school">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Content: {val.content}</h3>
                <h3>Website: {val.website}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewName(event.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewContent(event.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewWebsite(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateSchool(val.schoolID, val.name, val.content, val.website);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteSchool(val.schoolID);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
