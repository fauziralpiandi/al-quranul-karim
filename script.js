document.getElementById("search-button").addEventListener("click", function () {
	const surahNumber = document.getElementById("surah-input").value.trim();
	const ayatNumber = document.getElementById("ayat-input").value.trim();
	const resultDiv = document.getElementById("result");
	const inputGroup = document.querySelector(".input-group");
	const searchAgainButton = document.getElementById("search-again-button");
	const title = document.querySelector(".container h1");
	const subtitle = document.querySelector(".container h5");
	const footer = document.querySelector(".footer");

	document.querySelector(".container").classList.remove("fade-in");

	if (surahNumber === "" || ayatNumber === "") {
		resultDiv.innerHTML =
			'<div class="error-message">Masukkan nomor Surah dan Ayat untuk mencari.</div>';
		return;
	}

	const apiUrl = `https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayatNumber}`;
	const translationApiUrl = `https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayatNumber}/id.indonesian`;
	const tafsirApiUrl = `https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayatNumber}/id.jalalayn`;

	fetch(apiUrl)
		.then((response) => response.json())
		.then((data) => {
			if (data.status === "OK") {
				const ayat = data.data;

				fetch(translationApiUrl)
					.then((response) => response.json())
					.then((translationData) => {
						if (translationData.status === "OK") {
							const translation = translationData.data.text;

							fetch(tafsirApiUrl)
								.then((response) => response.json())
								.then((tafsirData) => {
									if (tafsirData.status === "OK") {
										const tafsir = tafsirData.data.text;

										resultDiv.innerHTML = `
																					<div class="result-card fade-in">
																							<h3>${ayat.surah.name}</h3>
																							<h4>Surah ${ayat.surah.englishName} (Ayat ${ayat.numberInSurah})</strong></h4>
																							<p class="lafadz">${ayat.text}</p>
																							<p class="latin">${translation}</p>
																							<br />
																							<p class="tafsir">${tafsir}</p>
																					</div>
																			`;
										inputGroup.style.display = "none";
										searchAgainButton.style.display = "block";
										title.style.display = "none";
										subtitle.style.display = "none";
										footer.style.display = "none";
									} else {
										resultDiv.innerHTML =
											'<div class="error-message">Tafsir tidak ditemukan.</div>';
									}
								})
								.catch((error) => {
									resultDiv.innerHTML =
										'<div class="error-message">Terjadi kesalahan saat mencari tafsir.</div>';
									console.error("Error:", error);
								});
						} else {
							resultDiv.innerHTML =
								'<div class="error-message">Terjemahan tidak ditemukan.</div>';
						}
					})
					.catch((error) => {
						resultDiv.innerHTML =
							'<div class="error-message">Terjadi kesalahan saat mencari terjemahan.</div>';
						console.error("Error:", error);
					});
			} else {
				resultDiv.innerHTML =
					'<div class="error-message">Ayat tidak ditemukan.</div>';
			}
		})
		.catch((error) => {
			resultDiv.innerHTML =
				'<div class="error-message">Terjadi kesalahan saat mencari ayat.</div>';
			console.error("Error:", error);
		});
});

document
	.getElementById("search-again-button")
	.addEventListener("click", function () {
		const inputGroup = document.querySelector(".input-group");
		const resultDiv = document.getElementById("result");
		const searchAgainButton = document.getElementById("search-again-button");
		const title = document.querySelector(".container h1");
		const subtitle = document.querySelector(".container h5");
		const footer = document.querySelector(".footer");
		document.querySelector(".container").classList.remove("fade-out"); // Remove the "expand" class
		document.querySelector(".container").classList.add("fade-in"); // Add the "shrink" class

		inputGroup.style.display = "flex";
		resultDiv.innerHTML = "";
		searchAgainButton.style.display = "none";
		title.style.display = "block";
		subtitle.style.display = "block";
		footer.style.display = "block";
	});

const accessKey = "e-DY1v3JuUgwzJvsJgt9z8lSSTnuepVDc67tl1ExNuw"; // Ganti dengan API Key kamu
const query = [ "alquran", "moon", "moonlight" ];
const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;

fetch(url)
	.then((response) => response.json())
	.then((data) => {
		const slidesContainer = document.querySelector(".slideshow-container");
		data.results.forEach((result, index) => {
			const slide = document.createElement("div");
			slide.classList.add("slideshow-slide");
			if (index === 0) slide.classList.add("active");
			slide.style.backgroundImage = `url(${result.urls.regular})`;
			slidesContainer.insertBefore(slide, slidesContainer.firstChild);
		});

		startSlideshow();
	})
	.catch((error) => console.error("Error:", error));

let currentSlide = 0;
let slides;

function startSlideshow() {
	slides = document.querySelectorAll(".slideshow-slide");
	setTimeout(showRandomSlide, 1500);
}

function showRandomSlide() {
	if (slides.length === 0) return;

	let randomIndex = Math.floor(Math.random() * slides.length);

	while (randomIndex === currentSlide) {
		randomIndex = Math.floor(Math.random() * slides.length);
	}

	slides[currentSlide].classList.remove("active");
	slides[randomIndex].classList.add("active");

	currentSlide = randomIndex;

	setTimeout(showRandomSlide, 1500);
}
