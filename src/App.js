import { useState } from 'react';

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});

  const handleSearch = async e => {
    e.preventDefault();
    if (search === '') return;

    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=100&srsearch=${search}`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();

    setResults(json.query.search);
    setSearchInfo(json.query.searchinfo);
  }

  return (
    <div className="App">
      <header>
        <h1>Nasif's Wiki Engine</h1>
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="What are you looking for?"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>
        {(searchInfo.totalhits && (searchInfo.totalhits >= 100)) ?
          <p>Displaying the first 100 out of the {searchInfo.totalhits} search results</p> :
          (searchInfo.totalhits && (searchInfo.totalhits < 100)) ?
            <p>Displaying the {searchInfo.totalhits} search results</p> :
            ''}
      </header>
      <div className="results">
        {results.map((result, i) => {
          const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
          return (
            <div className="result" key={i}>
              <h3><strong>{result.title}</strong></h3>
              <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
              <a href={url} target="_blank" rel="noreferrer">Read More</a>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
