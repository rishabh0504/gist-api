import { useEffect, useState } from 'react';
import { getGist } from './api/gist-api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FileDetails from './components/FileDetails.component';
import OwnerDetails from './components/OwnerDetails.compoent';
import Header from './components/Header.component';

function App() {
  const [username, setUsername] = useState("");
  const [gists, setGists] = useState([]);

  useEffect(async () => {
    if (!!username) {
      const gistsDetail = await getGist(username);
      setGists(gistsDetail);
    }
  }, [username]);

  return (
    <div>

      {/* Header Part */}
      <Header />
      {/* Input container Part */}

      <div className="col-12 filter mt-4 mb-4 ml-3 mr-3">
        <div className="col-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search By Username..."
            value={username}
            onChange={e => setUsername(e.target.value)} />
        </div>
      </div>

      {
        gists && (
          gists.map((eachGist, index) => {
            return (
              <div className="col-12 main-container" key={index}>
                <div className="col-12 mt-3 mb-3">
                  <div className="card bg-color">
                    <div className="card-body d-flex">
                      <div className="col-4 mt-4 mt-20 mrl-20">
                        <OwnerDetails id={eachGist.id} />
                      </div>
                      <div className="col-7 mt-4">
                        <FileDetails files={eachGist.files} id={eachGist.id} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )
      }

      {
        !gists.length > 0 && (
          <div className="col-12 nothing-found">
            <h5 className="text-info text-center">Nothing Found..!!!</h5>
          </div>
        )
      }
    </div>
  );
}

export default App;
