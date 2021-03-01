
$('#masukan').keypress(function (e) { 
  if(e.keyCode==13){
    $('#tombol').click()
  }
});
$('#tombol').click(function () { 
$(".content").html(`<div class="spinner-border text-primary mx-auto my-5 loading" role="status">
<span class="sr-only">Loading...</span>
</div>
`)

  let masukan = $("#masukan").val();
  if (masukan == '') {
    Swal.fire(
      'ups',
      'anda belum menulis sesuatu',
      'warning'
    )
  }

  fetch(" http://api.weatherapi.com/v1/current.json?key=467ffbc3bb2f4c2c9e664908211001&q="+masukan+"&lang=jv")
.then(hasil => {
    if(hasil.status == 400)(
      Swal.fire('lokasi tidak di temukan!')
    )
    else{
      return hasil.json()
    }
})
    .finally(()=> $('.loading').hide())
    .then(hasil => {
    let lokasi = hasil.location;
    let arus = hasil.current;
$(".content").html(`<div class="col-10 col-sm-10 col-md-9 col-lg-5 ikon mx-auto ikon-cuaca">
<img class="img-fluid" src="http:${arus.condition.icon}">
<h1 class="lokasi">${lokasi.name} : ${arus.temp_c}°C</h1>
<p class="suhu"></p>
</div>

<div class="col-10 col-sm-10 col-md-8 col-lg-8 mx-auto content">
  <ul class="list-group">
    <li class="list-group-item urutan m-3  text-white btn-outline-secondary">kondisi :${arus.condition.text} </li>
    <li class="list-group-item urutan m-3  text-white btn-outline-secondary">waktu tempat : ${lokasi.localtime}</li>
    <li class="list-group-item urutan m-3  text-white btn-outline-secondary">kecepatan angin : ${arus.wind_mph}  KM/H</li>
    <li class="list-group-item urutan m-3  text-white btn-outline-secondary">terakhir di update : ${arus.last_updated}</li>
  </ul>
</div>`) 
  })
})
