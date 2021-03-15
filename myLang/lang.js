  $('.bahasa').eq(0).toggleClass('garis-bawah');
  //ambil tiap tombol 
$('.bahasa').click(function (e) { 
    $('.bahasa').eq(0).removeClass('garis-bawah');
    $(this).each(function (index, element) {
    element.classList.toggle('garis-bawah')
     let kode = this.dataset.kode;
   proses(kode)
    });
});

$(document).ready(function () {
  //event binding
  proses()
  $(document).click(function (e) { 
      if(e.target.classList.contains('bahasa')){
          e.target.classList.toggle('garis-bawah');
      }
      
  });
});


function proses(k='id'){
    //testing argumen function
    //console.log(k);
    let kode = k;
    $('#kata').keyup(function () { 
        let kata = this.value;
        if(kata==''){
            $('#terjemahan').html('');
        }
        //test value dari text area
   //   console.log(kata);
//jalanin closure ke parent function
            let url = `https://api-translate.azharimm.tk/translate?engine=google&text=${kata}&to=${k}`;
         fetch(url).then(r => r.json()).then(r => terjemah(r))


    });
}
function terjemah(hasil){
 let data = hasil.data.result;
   $('#terjemahan').html(data);
}
let terjemahan = $('#terjemahan').html();


//mmuncul dan ngilangin alert
$('#kopi').click(function(){
    let el = $('#terjemahan');
    el.select();
    document.execCommand('copy');
    $('.alert').fadeIn(300).toggleClass('d-none');
    setTimeout(()=>{
        $('.alert').toggleClass('d-none');
    },2000)

});
