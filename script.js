(function () {
  function el(tag, className, text) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function renderHero(meta) {
    document.title = meta.name + ' \u2014 ' + meta.role;

    document.getElementById('nav-name').textContent = meta.name;
    document.getElementById('hero-name').textContent = meta.name;
    document.getElementById('hero-role').textContent = meta.role + (meta.location ? ' \u00b7 ' + meta.location : '');
    document.getElementById('hero-tagline').textContent = meta.tagline;

    var statBar = document.getElementById('stat-bar');
    (meta.statBar || []).forEach(function (s) {
      var stat = el('div', 'stat');
      stat.appendChild(el('span', 'stat-value', s.value));
      stat.appendChild(el('span', 'stat-label', s.label));
      statBar.appendChild(stat);
    });

    [document.getElementById('resume-download'), document.getElementById('resume-download-2')].forEach(function (a) {
      if (a && meta.resumeFile) a.href = meta.resumeFile;
    });

    var emailLink = document.getElementById('email-link');
    if (emailLink && meta.email) emailLink.href = 'mailto:' + meta.email;

    var linkedinLink = document.getElementById('linkedin-link');
    if (linkedinLink && meta.linkedin) linkedinLink.href = meta.linkedin;

    var footerContact = document.getElementById('footer-contact');
    if (footerContact) {
      var parts = [];
      if (meta.email) parts.push('<a href="mailto:' + meta.email + '">' + meta.email + '</a>');
      if (meta.linkedin) parts.push('<a href="' + meta.linkedin + '" target="_blank" rel="noopener">LinkedIn</a>');
      footerContact.innerHTML = parts.join(' &nbsp;\u00b7&nbsp; ');
    }
  }

  function renderAbout(about) {
    document.getElementById('about-text').textContent = about;
  }

  function renderCurrentlyBuilding(items) {
    var list = document.getElementById('currently-list');
    items.forEach(function (item) {
      var entry = el('div', 'currently-item');
      entry.appendChild(el('div', 'currently-title', item.title));
      entry.appendChild(el('p', 'currently-description', item.description));
      list.appendChild(entry);
    });
  }

  function renderOutsideOfWork(outside) {
    document.getElementById('outside-intro').textContent = outside.intro;
    var list = document.getElementById('interest-list');
    (outside.interests || []).forEach(function (item) {
      list.appendChild(el('li', null, item));
    });
  }

  function renderSkills(skills) {
    var grid = document.getElementById('skills-grid');
    skills.forEach(function (group) {
      var wrap = el('div', 'skill-group');
      wrap.appendChild(el('h3', 'skill-category', group.category));
      wrap.appendChild(el('div', 'skill-items', group.items.join(' \u00b7 ')));
      grid.appendChild(wrap);
    });
  }

  function renderExperience(experience) {
    var list = document.getElementById('experience-list');
    experience.forEach(function (job) {
      var entry = el('div', 'experience-entry');

      var head = el('div', 'experience-head');
      var titleWrap = el('div');
      titleWrap.appendChild(el('div', 'experience-role', job.role));
      titleWrap.appendChild(el('div', 'experience-company', job.company));
      head.appendChild(titleWrap);
      head.appendChild(el('div', 'experience-dates', job.dates));
      entry.appendChild(head);

      var ul = el('ul', 'experience-highlights');
      (job.highlights || []).forEach(function (h) {
        ul.appendChild(el('li', null, h));
      });
      entry.appendChild(ul);

      list.appendChild(entry);
    });
  }

  function renderProjects(projects) {
    var list = document.getElementById('projects-list');
    projects.forEach(function (project) {
      var entry = el('div', 'project-entry');

      var head = el('div', 'project-head');
      head.appendChild(el('h3', 'project-name', project.name));
      if (project.status) {
        var statusEl = el('div', 'project-status', project.status);
        if (/progress/i.test(project.status)) {
          statusEl.classList.add('status-progress');
        }
        head.appendChild(statusEl);
      }
      entry.appendChild(head);

      if (project.stack && project.stack.length) {
        var stack = el('div', 'project-stack');
        project.stack.forEach(function (s) {
          stack.appendChild(el('span', null, s));
        });
        entry.appendChild(stack);
      }

      if (project.summary) {
        entry.appendChild(el('p', 'project-summary', project.summary));
      }

      if (project.metrics && project.metrics.length) {
        var metrics = el('div', 'project-metrics');
        project.metrics.forEach(function (m) {
          var card = el('div', 'project-metric');
          card.appendChild(el('span', 'project-metric-value', m.value));
          card.appendChild(el('span', 'project-metric-label', m.label));
          metrics.appendChild(card);
        });
        entry.appendChild(metrics);
      }

      if (project.highlights && project.highlights.length) {
        var ul = el('ul', 'project-highlights');
        project.highlights.forEach(function (h) {
          ul.appendChild(el('li', null, h));
        });
        entry.appendChild(ul);
      }

      list.appendChild(entry);
    });
  }

  function renderError() {
    var main = document.querySelector('main');
    main.innerHTML = '<div class="section" style="border-top:none; padding-top:40px;">' +
      '<h2 class="section-title">Couldn\u2019t load content</h2>' +
      '<p style="color:var(--text-muted)">Could not load <code>data.json</code>. If you opened this file directly ' +
      '(file://), your browser blocks local fetch requests. Serve the folder with a local server ' +
      '(for example <code>python3 -m http.server</code>) or push it to GitHub Pages, where this loads normally.</p>' +
      '</div>';
  }

  fetch('data.json')
    .then(function (res) {
      if (!res.ok) throw new Error('data.json responded with ' + res.status);
      return res.json();
    })
    .then(function (data) {
      renderHero(data.meta || {});
      renderAbout(data.about || '');
      renderCurrentlyBuilding(data.currentlyBuilding || []);
      renderProjects(data.projects || []);
      renderExperience(data.experience || []);
      renderSkills(data.skills || []);
      renderOutsideOfWork(data.outsideOfWork || {});
    })
    .catch(function (err) {
      console.error(err);
      renderError();
    });
})();
