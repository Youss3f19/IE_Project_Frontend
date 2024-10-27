//navbar change event

$(window).scroll(function () {
if ($(window).scrollTop()) {
$(".navAnimation").addClass("change");
$(".text-light").addClass("text-change");
} else {
$(".navAnimation").removeClass("change");
$(".text-light").removeClass("text-change");

}
});

// Fonction de callback de l'observer
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');  // Ajoute la classe 'show' lorsque l'élément est visible
      } else {
        entry.target.classList.remove('show');  // Retire la classe 'show' lorsque l'élément n'est plus visible
      }
    });
  };
  
  // Options de l'observer
  const observerOptions = {
    root: null, // observe par rapport à la fenêtre de l'utilisateur
    threshold: 0.1 // déclenche à 10% de visibilité
  };
  
  // Création d'un IntersectionObserver
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  // Sélectionne tous les éléments que vous voulez observer
  document.querySelectorAll('.cardAnimation').forEach(card => {
    observer.observe(card);  // Observe chaque carte
  });
  

  