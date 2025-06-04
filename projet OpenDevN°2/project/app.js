let categorieSelectionnee = 'tous';
let indexPrecedent = null;

// Éléments du DOM
const quoteCard = document.querySelector('.quote-card');
const quoteContent = document.getElementById('quote-content');
const author = document.getElementById('author');
const categoryBtns = document.querySelectorAll('.category-btn');
const newQuoteBtn = document.getElementById('new-quote-btn');
const copyBtn = document.getElementById('copy-btn');
const twitterBtn = document.getElementById('twitter-btn');

// Fonction pour obtenir une citation aléatoire
function obtenirCitationAleatoire() {
    const citationsFiltrees = categorieSelectionnee === 'tous'
        ? citations
        : citations.filter(citation => citation.categorie === categorieSelectionnee);

    if (citationsFiltrees.length === 0) return null;

    let nouvelIndex;
    do {
        nouvelIndex = Math.floor(Math.random() * citationsFiltrees.length);
    } while (nouvelIndex === indexPrecedent && citationsFiltrees.length > 1);

    indexPrecedent = nouvelIndex;
    return citationsFiltrees[nouvelIndex];
}

// Fonction pour afficher une nouvelle citation
function afficherNouvelleCitation() {
    newQuoteBtn.classList.add('loading');
    quoteCard.classList.add('fade-out');

    setTimeout(() => {
        const citation = obtenirCitationAleatoire();
        if (citation) {
            quoteContent.textContent = citation.texte;
            author.textContent = citation.auteur;
            document.querySelector('.quote-category').textContent = 
                citation.categorie.charAt(0).toUpperCase() + citation.categorie.slice(1);
        }

        quoteCard.classList.remove('fade-out');
        newQuoteBtn.classList.remove('loading');
    }, 500);
}

// Gestionnaires d'événements
newQuoteBtn.addEventListener('click', afficherNouvelleCitation);

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categorieSelectionnee = btn.dataset.category;
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        afficherNouvelleCitation();
    });
});

// Fonction pour copier la citation
copyBtn.addEventListener('click', async () => {
    const texteCitation = `"${quoteContent.textContent}" - ${author.textContent}`;
    
    try {
        await navigator.clipboard.writeText(texteCitation);
        
        const toast = document.createElement('div');
        toast.className = 'copied-toast';
        toast.textContent = 'Citation copiée !';
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    } catch (err) {
        console.error('Erreur lors de la copie :', err);
    }
});

// Fonction pour partager sur Twitter
twitterBtn.addEventListener('click', () => {
    const texteCitation = `"${quoteContent.textContent}" - ${author.textContent}`;
    const urlTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(texteCitation)}`;
    window.open(urlTwitter, '_blank');
});

// Afficher une première citation au chargement
afficherNouvelleCitation();