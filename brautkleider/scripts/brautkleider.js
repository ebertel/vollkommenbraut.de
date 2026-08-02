(function () {
  function encodePath(path) {
    return encodeURI(path);
  }

  function imageBasePath(folder, file) {
    return "/site/assets/sorted/" + folder + "/" + file;
  }

  function toVariant(path, suffix) {
    var match = path.match(/^(.*)\.[^.]+$/);
    if (!match) return path;
    return match[1] + "-" + suffix + ".webp";
  }

  function buildTile(category) {
    var path500 = toVariant(category.heroImage, "500");
    var path1200 = toVariant(category.heroImage, "1200");

    var tile = document.createElement("a");
    tile.className = "category-tile";
    tile.href = category.url;

    var image = document.createElement("img");
    image.src = encodePath(path1200);
    image.srcset = encodePath(path500) + " 500w, " + encodePath(path1200) + " 1200w";
    image.sizes = "(max-width: 768px) 500px, 1200px";
    image.alt = category.title;
    image.loading = "lazy";
    tile.appendChild(image);

    var content = document.createElement("div");
    content.className = "category-tile-content";

    var title = document.createElement("h2");
    title.textContent = category.title;
    content.appendChild(title);

    tile.appendChild(content);
    return tile;
  }

  function buildGalleryItem(dress, categoryTitle, galleryName) {
    var fullPath = imageBasePath(dress.folder, dress.file);
    var path500 = toVariant(fullPath, "500");
    var path1200 = toVariant(fullPath, "1200");
    var pathFull = toVariant(fullPath, "full");

    var wrapper = document.createElement("div");
    wrapper.className = "bild rounded";

    var link = document.createElement("a");
    link.href = encodePath(pathFull);
    link.setAttribute("data-fancybox", galleryName);
    link.setAttribute("data-caption", categoryTitle);
    link.setAttribute("title", "");

    var image = document.createElement("img");
    image.src = encodePath(path1200);
    image.srcset = encodePath(path500) + " 500w, " + encodePath(path1200) + " 1200w";
    image.sizes = "(max-width: 768px) 500px, 1200px";
    image.alt = categoryTitle;
    image.title = "";
    image.loading = "lazy";

    link.appendChild(image);
    wrapper.appendChild(link);
    return wrapper;
  }

  function buildSectionCopy(category, title, text, variant, headingTag, extraParagraphs) {
    var copy = document.createElement("section");
    copy.className = "category-copy category-copy--" + variant + " reveal reveal-left";

    var kicker = document.createElement("p");
    kicker.className = "category-copy-kicker";
    kicker.textContent = category.title;
    copy.appendChild(kicker);

    var heading = document.createElement(headingTag || "h1");
    heading.textContent = title;
    copy.appendChild(heading);

    var body = document.createElement("p");
    body.textContent = text;
    copy.appendChild(body);

    (extraParagraphs || []).forEach(function (paragraph) {
      var extra = document.createElement("p");
      extra.textContent = paragraph;
      copy.appendChild(extra);
    });

    return copy;
  }

  function buildStoryCopy(category) {
    var copy = document.createElement("section");
    copy.className = "category-copy category-copy--story reveal reveal-left";

    var kicker = document.createElement("p");
    kicker.className = "category-copy-kicker";
    kicker.textContent = "Weitere Eindrücke";
    copy.appendChild(kicker);

    var heading = document.createElement("h2");
    heading.textContent = category.storyTitle || "Viele Möglichkeiten, dein Kleid ganz individuell zu gestalten";
    copy.appendChild(heading);

    var body = document.createElement("p");
    body.textContent =
      category.storyText ||
      category.title +
        ". Weitere Modelle zeigen, wie vielseitig diese Stilrichtung bei Stoff, Linie und Wirkung sein kann.";
    copy.appendChild(body);

    return copy;
  }

  function buildRevealImage(dress, categoryTitle, galleryName, direction) {
    var card = buildGalleryItem(dress, categoryTitle, galleryName);
    card.className = "category-shot category-shot--" + direction + " reveal reveal-" + direction;
    return card;
  }

  function revealNodes(nodes) {
    var reducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    Array.prototype.forEach.call(nodes, function (node, index) {
      if (reducedMotion) {
        node.classList.add("is-visible");
        return;
      }

      window.setTimeout(function () {
        node.classList.add("is-visible");
      }, 90 + index * 110);
    });
  }

  function initFancybox() {
    if (!window.jQuery || !window.jQuery.fancybox) return;

    window.jQuery("[data-fancybox]").fancybox({
      buttons: ["zoom", "slideShow", "thumbs", "close"],
      protect: true,
      loop: true,
      mobile: {
        preventCaptionOverlap: false,
        idleTime: false,
        clickContent: false,
        clickSlide: false,
        dblclickContent: false,
        dblclickSlide: false
      }
    });
  }

  function renderOverview(data) {
    var stage = document.getElementById("category-stage");
    if (!stage) {
      var fallbackGrid = document.getElementById("category-grid");
      if (!fallbackGrid) return;
      data.categories.forEach(function (category) {
        fallbackGrid.appendChild(buildTile(category));
      });
      return;
    }

    stage.innerHTML = "";

    var overview = data.overview || {};

    var introBlock = document.createElement("div");
    introBlock.className = "overview-copy reveal reveal-left";

    var title = document.createElement("h1");
    title.textContent = overview.title || "Entdecke unsere Brautkleider";
    introBlock.appendChild(title);

    (overview.paragraphs || []).forEach(function (paragraph) {
      var introParagraph = document.createElement("p");
      introParagraph.textContent = paragraph;
      introBlock.appendChild(introParagraph);
    });

    var groups = [
      data.categories.slice(0, 2),
      data.categories.slice(2, 4)
    ];

    stage.appendChild(introBlock);

    groups.forEach(function (categories, rowIndex) {
      var row = document.createElement("div");
      row.className = "overview-row overview-row--" + (rowIndex === 0 ? "top" : "bottom");

      var copy = document.createElement("div");
      copy.className = "overview-copy reveal reveal-left";

      categories.forEach(function (category, index) {
        var entry = document.createElement("div");
        entry.className = "overview-entry";

        var heading = document.createElement("h1");
        heading.textContent = category.title;
        entry.appendChild(heading);

        var overviewParagraphs = [category.intro];
        if (category.detailParagraphs && category.detailParagraphs.length) {
          overviewParagraphs = overviewParagraphs.concat(category.detailParagraphs);
        } else if (category.detailText) {
          overviewParagraphs.push(category.detailText);
        }

        overviewParagraphs.forEach(function (paragraph) {
          var intro = document.createElement("p");
          if (paragraph !== category.intro) {
            intro.className = "overview-extra";
          }
          intro.textContent = paragraph;
          entry.appendChild(intro);
        });

        copy.appendChild(entry);
      });

      row.appendChild(copy);

      categories.forEach(function (category) {
        var tile = buildTile(category);
        tile.className = "category-tile overview-tile reveal reveal-right";
        row.appendChild(tile);
      });

      stage.appendChild(row);

      var mobileStack = document.createElement("div");
      mobileStack.className = "overview-mobile-stack";

      categories.forEach(function (category) {
        var mobileEntry = document.createElement("div");
        mobileEntry.className = "overview-mobile-entry";

        var mobileText = document.createElement("div");
        mobileText.className = "overview-entry reveal reveal-left";

        var mobileHeading = document.createElement("h1");
        mobileHeading.textContent = category.title;
        mobileText.appendChild(mobileHeading);

        var mobileIntro = document.createElement("p");
        mobileIntro.textContent = category.intro;
        mobileText.appendChild(mobileIntro);

        mobileEntry.appendChild(mobileText);
        mobileEntry.appendChild(buildTile(category));
        mobileStack.appendChild(mobileEntry);
      });

      stage.appendChild(mobileStack);
    });

    revealNodes(stage.querySelectorAll(".reveal"));
  }

  function renderCategoryPage(data, slug) {
    var category = data.categories.find(function (entry) {
      return entry.slug === slug;
    });
    if (!category) return;

    var stage = document.getElementById("category-stage");

    var dressesForPage = data.dresses
      .filter(function (dress) {
        if (category.folder) return dress.folder === category.folder;
        return dress.categories.includes(slug);
      })
      .sort(function (a, b) {
        return a.file.localeCompare(b.file, "de");
      });
    if (slug === "mit-aermeln") {
      var removedLeadFiles = new Set([
        "30134w-1138.JPEG",
        "30139W (1).JPEG",
        "35002 (2).JPEG"
      ]);
      dressesForPage = dressesForPage.filter(function (dress) {
        return !removedLeadFiles.has(dress.file);
      });

      var leadDressIndex = dressesForPage.findIndex(function (dress) {
        return dress.file === "IMG_5358.jpg";
      });
      if (leadDressIndex > 0) {
        var leadDress = dressesForPage.splice(leadDressIndex, 1)[0];
        dressesForPage.unshift(leadDress);
      }

      var accentDressIndex = dressesForPage.findIndex(function (dress) {
        return dress.file === "FF87FF62-9F7E-491C-8218-A3FDB2AFFBFE.PNG";
      });
      if (accentDressIndex > 1) {
        var accentDress = dressesForPage.splice(accentDressIndex, 1)[0];
        dressesForPage.splice(1, 0, accentDress);
      }
    } else if (slug === "schlicht-modern") {
      dressesForPage = dressesForPage.filter(function (dress) {
        return dress.file !== "25026 (1).JPEG" && dress.file !== "30165w-2415.JPEG";
      });

      var preservedCleanLead = dressesForPage.slice(0, 2);
      var remainingCleanDresses = dressesForPage.slice(2);
      var cleanLeadImage = remainingCleanDresses.findIndex(function (dress) {
        return dress.file === "IMG_0518.JPG";
      });
      if (cleanLeadImage > -1) {
        preservedCleanLead.unshift(remainingCleanDresses.splice(cleanLeadImage, 1)[0]);
      }

      var featuredCleanFiles = [
        "3D8A2EDD-2F80-4FAB-BDCC-33291A784320.PNG",
        "9C8B5E18-802F-4CFC-8E5B-634CCCB9A00A.PNG"
      ];
      var featuredCleanDresses = [];

      featuredCleanFiles.forEach(function (file) {
        var idx = remainingCleanDresses.findIndex(function (dress) {
          return dress.file === file;
        });
        if (idx > -1) {
          featuredCleanDresses.push(remainingCleanDresses.splice(idx, 1)[0]);
        }
      });

      dressesForPage = preservedCleanLead.concat(featuredCleanDresses, remainingCleanDresses);
    } else if (slug === "leicht-fliessend") {
      dressesForPage = dressesForPage.filter(function (dress) {
        return dress.file !== "25012 (3).JPEG";
      });

      var secondLightDressIndex = dressesForPage.findIndex(function (dress) {
        return dress.file === "me 25313 39.JPG";
      });
      if (secondLightDressIndex > 1) {
        var secondLightDress = dressesForPage.splice(secondLightDressIndex, 1)[0];
        dressesForPage.splice(1, 0, secondLightDress);
      }

      var thirdLightDressIndex = dressesForPage.findIndex(function (dress) {
        return dress.file === "25034 (1).JPEG";
      });
      if (thirdLightDressIndex > 2) {
        var thirdLightDress = dressesForPage.splice(thirdLightDressIndex, 1)[0];
        dressesForPage.splice(2, 0, thirdLightDress);
      }
    } else if (slug === "mit-spitze") {
      dressesForPage = dressesForPage.filter(function (dress) {
        return dress.file !== "30082w-1463.JPEG";
      });
    }
    if (!stage) return;

    var heroDresses = dressesForPage.slice(0, 2);
    var threeDresses = dressesForPage.slice(2, 5);
    var sixDresses = dressesForPage.slice(6, 12);

    stage.innerHTML = "";

    var stageIntro = buildSectionCopy(
      category,
      category.title,
      category.intro,
      "lead",
      "h1",
      category.introParagraphs
    );
    stageIntro.className = "category-copy category-copy--lead reveal reveal-left";

    var heroRow = document.createElement("div");
    heroRow.className = "category-row category-row--hero";
    heroRow.appendChild(stageIntro);
    heroDresses.forEach(function (dress) {
      heroRow.appendChild(buildRevealImage(dress, category.title, "gallery-" + slug, "right"));
    });
    stage.appendChild(heroRow);

    var threeRow = document.createElement("div");
    threeRow.className = "category-row category-row--three";
    var threeCopy = document.createElement("div");
    threeCopy.className = "category-copy reveal reveal-left";
    var threeHeading = document.createElement("h2");
    threeHeading.textContent = category.detailTitle || category.title;
    threeCopy.appendChild(threeHeading);
    var threeParagraphs = category.detailParagraphs || (category.detailText ? [category.detailText] : [category.intro]);
    threeParagraphs.forEach(function (paragraph) {
      var threeBody = document.createElement("p");
      threeBody.textContent = paragraph;
      threeCopy.appendChild(threeBody);
    });
    threeRow.appendChild(threeCopy);
    threeDresses.forEach(function (dress, index) {
      var direction = index < 2 ? "left" : "right";
      threeRow.appendChild(buildRevealImage(dress, category.title, "gallery-" + slug, direction));
    });
    stage.appendChild(threeRow);

    var storyRow = document.createElement("div");
    storyRow.className = "category-row category-row--story";
    storyRow.appendChild(buildStoryCopy(category));

    var storyGrid = document.createElement("div");
    storyGrid.className = "category-grid category-grid--six";
    sixDresses.forEach(function (dress, index) {
      storyGrid.appendChild(buildRevealImage(dress, category.title, "gallery-" + slug, index % 2 === 0 ? "left" : "right"));
    });
    storyRow.appendChild(storyGrid);
    stage.appendChild(storyRow);

    revealNodes(stage.querySelectorAll(".reveal"));
  }

  var body = document.body;
  var dataUrl = body.getAttribute("data-data-url");
  var pageType = body.getAttribute("data-page-type");
  var categorySlug = body.getAttribute("data-category");

  if (!dataUrl) return;

  fetch(dataUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Could not load brautkleider data");
      }
      return response.json();
    })
    .then(function (data) {
      if (pageType === "overview") {
        renderOverview(data);
      }
      if (pageType === "category" && categorySlug) {
        renderCategoryPage(data, categorySlug);
      }
      initFancybox();
    })
    .catch(function (error) {
      // Keep UI stable but surface issue for debugging.
      console.error(error);
    });
})();
