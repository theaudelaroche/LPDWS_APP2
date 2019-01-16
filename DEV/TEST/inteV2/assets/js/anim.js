$(document).ready(function() {

  $('input:radio[name="currentQuestion"]').click(function() {
    console.log('yes');
  });

  //loader fadeOut
  var loaderwait = function (){
    $('.loader-wrapper').fadeOut(1000);
  }
  setTimeout(loaderwait, 2500);



  //GSAP Logo Animation

  var tl = new TimelineLite();

  tl.from('#W', 0.15, {scale:0.001, transformOrigin:"50% 50%"})
  .from('#H', 0.15, {scale:0.001, transformOrigin:"50% 50%"})
  .from('#A', 0.15, {scale:0.001, transformOrigin:"50% 50%"})
  .from('#T', 0.15, {scale:0.001, transformOrigin:"50% 50%"})
  .from('#F', 0.15, {scale:0.001, transformOrigin:"50% 50%"})
  .from('#O', 0.15, {scale:0.001, transformOrigin:"50% 50%"})
  .from('#N', 0.15, {scale:0.001, transformOrigin:"50% 50%"})
  .from('#T2', 0.15, {scale:0.001, transformOrigin:"50% 50%"})
  .from('#question', 0.15, {scale:0.001, transformOrigin:"50% 50%"})
  .from('#logocomplex', 1, {scale: 0.8, ease: Elastic.easeOut.config(1, 0.4), transformOrigin:"50% 50%"})

// $(document).ready(function() {
//   $(".btn-container a").click(function() {
//     $("#app").addClass("active1");
//   });
// });

});
