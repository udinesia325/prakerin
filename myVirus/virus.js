
$('#tombol').click(function (){
  $('body').css({
    'background':'rgb(237, 237, 255)',
    'overflow':'auto'
  })
  $('.atasan').slideUp(500);
  $(this).hide()
})

//data nasional
fetch('https://covid19.mathdro.id/api/countries/indonesia')
.then(hasil => hasil.json())
.then(hasil => {
     let positif =  hasil.confirmed.value
     let mati    =  hasil.deaths.value
     let sembuh  =  hasil.recovered.value
    return $('.isi').html(` <div class="col col-8 col-sm-7 col-md-3 col-lg-3  mx-auto my-2">
    <div class="card" style="width: 18rem;">
        <div class="card-tittle bg-warning text-center font-weight-bold">positif</div>
        <div class="card-body">
        <h2 class="card-text">${positif.toLocaleString()} 
          <img src="../assests/sedih.png" class="emoticon">
          orang
        </h2>
        </div>
      </div>
</div>
<div class="col col-8 col-sm-8 col-md-3 col-lg-3 mx-auto my-2">
    <div class="card" style="width: 18rem;">
        <div class="card-tittle bg-success text-center font-weight-bold">sembuh</div>
        <div class="card-body">
          <h2 class="card-text">${mati.toLocaleString()} 
          <img src="../assests/happy.png" class="emoticon">
          orang
          </h2>
        </div>
    </div>
</div>
<div class="col col-8 col-sm-8 col-md-3 col-lg-3  mx-auto my-2">
    <div class="card" style="width: 18rem;">
        <div class="card-tittle bg-danger text-center font-weight-bold">meninggal</div>
        <div class="card-body">
          <h2 class="card-text">${sembuh.toLocaleString()} 
          <img src="../assests/menangis.png" class="emoticon">
          orang
          </h2>
        </div>
    </div>
</div>
`);
})
//data per provinsi
fetch("https://indonesia-covid-19.mathdro.id/api/provinsi/")
.then(epep => epep.json())
.then(pabji => {
        let td = '';
        let no = 1;
        pabji.data.forEach(d => {
          if(d.provinsi != 'Indonesia'){
          td +=  `<tr>
            <td class='alert-secondary'>${no}</td>
            <td class=''>${d.provinsi.toLocaleString()}</td>
            <td class='oren'>${d.kasusPosi.toLocaleString()}</td>
            <td class='hijo'>${d.kasusSemb.toLocaleString()}</td>
            <td class='abang'>${d.kasusMeni.toLocaleString()}</td>
          </tr>`;
          no++
          }
           
        })
            $('.semua').html(td)
})

//data covid total global
fetch('https://covid19.mathdro.id/api')
.then(alucard => alucard.json())
.then(lancelot => {
  let positif = lancelot.confirmed.value;
  let sembuh = lancelot.recovered.value;
  let mati = lancelot.deaths.value;
    $('.data-global').html(` <div class="col col-8 col-sm-7 col-md-3 col-lg-3  mx-auto my-2">
    <div class="card" style="width: 18rem;">
    <div class="card-tittle bg-warning text-center font-weight-bold">positif</div>
      <div class="card-body">
        <h2 class="card-text">${positif.toLocaleString()}
        <img src="../assests/sedih.png" class="emoticon">
        orang
        </h2>
      </div>
    </div>
    
  </div>
  <div class="col col-8 col-sm-7 col-md-3 col-lg-3  mx-auto my-2">
    <div class="card" style="width: 18rem;">
      <div class="card-tittle bg-success text-center font-weight-bold">sembuh</div>
      <div class="card-body">
        <h2 class="card-text">${sembuh.toLocaleString()}
        <img src="../assests/happy.png" class="emoticon">
        orang
        </h2>
      </div>
    </div>
    
  </div> <div class="col col-8 col-sm-7 col-md-3 col-lg-3  mx-auto my-2">
    <div class="card" style="width: 18rem;">
      <div class="card-tittle bg-danger text-center font-weight-bold">meninggal</div>
      <div class="card-body">
        <h2 class="card-text">${mati.toLocaleString()}
        <img src="../assests/menangis.png" class="emoticon">
        orang
        </h2>
      </div>
    </div>  
  </div>`)
})

// data covid global

fetch('https://api.kawalcorona.com/')
.then(awm => awm.json())
.then(ak47 => {
        let td = '';
        let no = 1;
     ak47.forEach(a => {
        let negara = a.attributes.Country_Region;
        let positif =a.attributes.Confirmed;
        let sembuh =a.attributes.Recovered;
        let mati =a.attributes.Deaths;
        td +=`<tr>
        <td class='alert-secondary'>${no}</td>
        <td class=''>${negara}</td>
        <td class='oren'>${positif}</td>
        <td class='hijo'>${sembuh}</td>
        <td class='abang'>${mati}</td>
      </tr>`;
      no++
     })
    $('.disini').html(td);
})