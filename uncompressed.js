/*Dependencies:
1) jsPDF: https://github.com/parallax/jsPDF 
2) allOrigins: https://allorigins.win/
*/

if (location.origin == 'https://www.slideshare.net') {

    var tryCount = 0;
    const proxyServer = 'https://api.allorigins.win/raw?url=';

    if (!document.querySelectorAll('#ssdScript').length) {
        console.log('Dependencies: \n1) jsPDF: https://github.com/parallax/jsPDF \n2) allOrigins: https://allorigins.win/');

        // Adding jsPdf script
        function addScript(url) {
            var script = document.createElement('script');
            script.type = 'application/javascript';
            script.src = url;
            script.id = 'ssdScript';
            document.head.appendChild(script);
        }

        addScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
        addScript('https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js');
        console.log('jsPDF script added!');

        // Image to pdf converter
        function ssDownloader() {
            //Logging on screen
            if (!document.querySelectorAll("#ssdButton").length) {
                document.querySelector('#status').innerHTML += '➟ Creating PDF...<br>';
            }

            window.jsPDF = window.jspdf.jsPDF;
            if (imgLinks.length) {

                var doc = new jsPDF();
                imgLinks.forEach((x, index) => {
                    var currImage = document.querySelectorAll("img")[index];
                    var orientation = 'l';
                    if (currImage.naturalWidth < currImage.naturalHeight) orientation = 'p';
                    doc.addPage([currImage.naturalWidth, currImage.naturalHeight], orientation)
                    doc.addImage(x, "JPEG", 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
                });

                doc.deletePage(1); // deleting blank page
                if (!document.querySelectorAll("#ssdButton").length) {
                    document.querySelector('#status').innerHTML += '➟ PDF is ready to download! 👍<br><br> <button id="ssdButton" onclick="location.reload()">Back to slideshare.net</button>  <button onclick="ssDownloader()">Download pdf again</button><br>';
                }
                doc.save(document.querySelectorAll('title')[0].innerText + '.pdf');

                console.log('done!');
                //Logging on screen
            }
        }
        console.log('Download script added!');
    }

    if (document.querySelectorAll('#y4OyX0JzA8v7WNFa').length) {
        retryDownload()
    } else {

        // Taking URL of all slides
        // And proxy {https://api.allorigins.win/raw?url=} to bypass cors
        var imgLinks = [];
        document.querySelectorAll(".slide-image").forEach(x => {
            imgLinks.push(proxyServer + x.srcset.split(' ').slice(-2)[0]);
        });

        setTimeout(() => {
            downloadingFiles()
        }, 500);
    }


    // image download retry
    function retryDownload() {
        setTimeout(() => {
            if (tryCount < 5) {
                downloadingFiles();
                tryCount++;
                document.getElementById('status').innerHTML = '➟ Download attempts: ' + (tryCount);
            } else {
                document.getElementById('status').innerHTML = '➟ Download attempts: ' + (tryCount) + '<br>❌ Download failed! 😥<br><br><button id="ssdButton" onclick="location.reload()">Back to slideshare.net</button>'
            }
        }, 600);

    }


    // Displaying all slides on body
    function downloadingFiles() {
        if (imgLinks.length) {


            var newDiv = '<h1 id="y4OyX0JzA8v7WNFa">Slideshare Downloader</h1><hr><div id="status" style="width: 100%"></div>';
            imgLinks.forEach(x => {
                newDiv += '<img src="' + x + '"style="display:none;" onerror="retryDownload()">';
            });
            document.body.removeAttribute('id');
            document.body.style.padding = "10px";

            //Logging on screen
            document.body.innerHTML = newDiv;

            var imgs = document.images,
                len = imgs.length,
                counter = 0;
            //couner log
            document.querySelector('#status').innerHTML = '⏬ Downloading Slides...<br>➟ [<span id="counter">0</span>/' + len + '] slides downloaded<br>';





            //Waiting for images to get loaded :{https://stackoverflow.com/questions/11071314/javascript-execute-after-all-images-have-loaded}



            document.querySelector('#status').innerHTML += '';
            [].forEach.call(imgs, function (img) {
                if (img.complete) {
                    incrementCounter();
                } else {
                    img.addEventListener('load', incrementCounter, false);
                }
            });




            function incrementCounter() {
                counter++;
                var counterDisplay = document.querySelectorAll('#counter');
                if (counterDisplay.length)
                    counterDisplay[0].innerText = counter;
                if (counter === len) {
                    console.log('All images loaded!');

                    setTimeout(() => {
                        ssDownloader()
                    }, 200);
                }
            }

        } else alert('⚠️ Download failed!, No slides found.');
    }
} else alert('This website is not supported :(');
