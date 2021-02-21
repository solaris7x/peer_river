const { pipeline } = require("stream");

const WebTorrent = require("webtorrent-hybrid");
const mime = require("mime-types");

const torrentStream = (magnetURI, fileIndex, expressResponse) => {
  const client = new WebTorrent({
    maxConns: 100,
    tracker: true,
  });
  try {
    const tortimeout = setTimeout(() => {
      console.log("Taking too long");
      expressResponse.status(404).send("Taking too long");
    }, 10000);

    const torrent = client.add(magnetURI);

    torrent.on("error", (err) => {
      console.log("Some Error " + err);
      expressResponse.status(404).send("Some brokey error");
      // client.destroy(() => console.log("Destroying client"));
    });

    // torrent.on("warning", (err) => {
    //   console.log("Some warning " + err);
    //   // expressResponse.status(404).send("Some error");
    //   // client.destroy(() => console.log("Destroying client"));
    // });

    // torrent.on("noPeers", (peerType) => {
    //   console.log("No tracker peers");
    //   // if (peerType === "tracker") {
    //   // expressResponse.status(404).send("No peers");
    //   // client.destroy(() => console.log("Destroying client"));
    //   // }
    // });

    torrent.on("ready", () => {
      clearTimeout(tortimeout);
      // Torrents can contain many files. Let's use the .mp4 file
      const file = torrent.files[fileIndex];

      if (file === undefined) {
        expressResponse.status(404).send("File not Found");
        return;
      }
      console.log(file.name);

      expressResponse.writeHead(200, {
        "Content-Type": mime.lookup(file.name) || "application/octet-stream",
        "Content-Length": file.length,
        "Content-Disposition": `attachment; filename="${file.name}"`,
      });

      const torReadstream = file.createReadStream();
      // expressResponse.on("finish", () => {
      // });
      console.log("Starting Stream " + file.name);
      pipeline(torReadstream, expressResponse, (err) => {
        if (err) console.log("Pipe error" + err);
        // client.destroy(() => console.log("Destroyed client: " + file.name));
      });
      // torReadstream.pipe(expressResponse);
    });

    // Cleanup
    expressResponse.on("close", () => {
      client.destroy(() => console.log("Destroyed client"));
      clearTimeout(tortimeout);
    });
  } catch (err) {
    console.log("Some code messed up " + err);
    expressResponse.status(404).send("Some code messed up");
  }
  // finally {
  //   client.destroy(() => console.log("Destroyed client"));
  // }
};

module.exports = torrentStream;
