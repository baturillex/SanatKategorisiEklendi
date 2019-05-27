const express = require('express');
//const ejs = require('ejs');
var multer = require('multer');
var storage = multer.memoryStorage(); // resim yüklemek için eklendi.
var upload = multer({ storage: storage }); // resim yüklemek için eklendi.
const bp = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
const login = require('./loginOps');

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/javascript', express.static(path.join(__dirname, 'javascript')));

app.set('view engine', 'ejs');
app.use(bp.urlencoded({ extended: false }));
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/guncelle', login.userGuncelle);
app.get('/etkinlikolustur', function(req, res) {
  res.render('etkinlikolustur');
});

app.post('/guncelle', login.Guncelle);

app.post('/etkinlikolustur', upload.single('İmageUpload'), login.userLogin); // upload single resim için.

app.get('/etkinlikleregozat', login.userGozAt);

app.get('/etkinlikbilgileri/:id', login.userEtkinlikBilgileri);
app.get('/konusmacibilgileri/:id', login.userKonusmaciBilgileri);

app.get('/Login', login.Giris);
app.post('/Login', login.userGiris);
app.get('/oturumac', login.UyeOl);
app.post('/oturumac', login.userOturumAc);

app.get('/Anasayfa', function(req, res) {
  res.render('Anasayfa');
});
app.get('/EtkinlikYonet', login.userYonet);

app.get('/unutmaoncesi', login.SifreOncesi);
app.post('/unutmaoncesi', login.userSifreOncesi);

app.post('/sifremiunuttum', login.usersifreunutmak);

app.get('/profil', login.userprofil);

app.get('/sanat/:EtkinlikTipi', login.sanat);

app.get('/konusmacibilgileri', login.userKonusmaciBilgileri);
app.listen(port, () => console.log(`Port Çalışıyor :  ${port}!`));
