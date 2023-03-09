import "./App.sass";
// import StreamDaVinci from "./components/streams/StreamDaVinci";
// import ChatGPT3 from "./components/queries/ChatGPT3";
import StreamGPT3 from "./components/streams/StreamGPT3";

function App() {
 

  return (
    <div className="App">
      <main className="main">
        {/* <StreamDaVinci /> */}
        <StreamGPT3 />
      </main>
    </div>
  );
}

export default App;
