# Peer-River makeshift docs

> Dirty express app to pipe torrents over http (using webtorrent)

> I wrote this app for simple experimentation , as such dependency versions might be outdated.

This app uses [Webtorrent](https://webtorrent.io/) and [ExpressJS](https://expressjs.com/) for all the voodoo magic

## API Endpoints

| Path       | Arguments                                     | Description                                              |
| ---------- | --------------------------------------------- | -------------------------------------------------------- |
| /listfiles | magnetURI                                     | To list the files for given magnet URI                   |
| /getfile   | magnetURI , fileIndex (optional, default = 0) | To get any 1 specific file from the given torrent magnet |

## Example

1. To list the files for given magnet URI

   Format : `localhost:port/listfiles?magnetURI=magnet-link`

   Eg. `http://localhost:3000/listfiles?magnetURI=magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel`

2. To get any 1 specific file from the given torrent magnet

   Format : `localhost:port/lgetfile?magnetURI=magnet-link&fileIndex=0`

   Note: The default fileIndex is 0 , you can find the index of specific a file from /listfiles endpoint

   Eg. `http://localhost:3000/getfile?magnetURI=magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&fileIndex=2`

## Limitations

- The torrent size cannot be larger than storage space of the machine you run it on
- The app will have to download the file before passing on to http request
