// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="title-page.html">Getting Things Done in Next.js</a></li><li class="chapter-item expanded affix "><a href="introduction.html">Introduction</a></li><li class="chapter-item expanded affix "><a href="acknowledgments.html">Acknowledgments</a></li><li class="chapter-item expanded "><a href="chapter1/index.html"><strong aria-hidden="true">1.</strong> A Brief Introduction to JavaScript</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter1/01-hello-world.html"><strong aria-hidden="true">1.1.</strong> Hello World</a></li><li class="chapter-item expanded "><a href="chapter1/02-primitive-data-types.html"><strong aria-hidden="true">1.2.</strong> Primitive Data Types</a></li><li class="chapter-item expanded "><a href="chapter1/03-arrays-and-objects.html"><strong aria-hidden="true">1.3.</strong> Arrays and Objects</a></li><li class="chapter-item expanded "><a href="chapter1/04-control-flow.html"><strong aria-hidden="true">1.4.</strong> Control Flow</a></li><li class="chapter-item expanded "><a href="chapter1/05-functions.html"><strong aria-hidden="true">1.5.</strong> Functions</a></li><li class="chapter-item expanded "><a href="chapter1/06-classes.html"><strong aria-hidden="true">1.6.</strong> Classes</a></li><li class="chapter-item expanded "><a href="chapter1/07-error-handling.html"><strong aria-hidden="true">1.7.</strong> Error Handling</a></li><li class="chapter-item expanded "><a href="chapter1/08-basic-datastructures.html"><strong aria-hidden="true">1.8.</strong> Basic Data Structures</a></li><li class="chapter-item expanded "><a href="chapter1/09-functional-thinking.html"><strong aria-hidden="true">1.9.</strong> Functional Thinking</a></li><li class="chapter-item expanded "><a href="chapter1/10-asynchronous-programming.html"><strong aria-hidden="true">1.10.</strong> Asynchronous Programming</a></li><li class="chapter-item expanded "><a href="chapter1/11-modules.html"><strong aria-hidden="true">1.11.</strong> Modules</a></li><li class="chapter-item expanded "><a href="chapter1/12-packages.html"><strong aria-hidden="true">1.12.</strong> Packages</a></li><li class="chapter-item expanded "><a href="chapter1/13-writing-decent-code.html"><strong aria-hidden="true">1.13.</strong> Writing Decent Code</a></li></ol></li><li class="chapter-item expanded "><a href="chapter2/index.html"><strong aria-hidden="true">2.</strong> Leveling Up with TypeScript</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter2/01-why-typescript.html"><strong aria-hidden="true">2.1.</strong> Why TypeScript?</a></li><li class="chapter-item expanded "><a href="chapter2/02-basic-types.html"><strong aria-hidden="true">2.2.</strong> Basic Types</a></li><li class="chapter-item expanded "><a href="chapter2/03-annotating-functions.html"><strong aria-hidden="true">2.3.</strong> Annotating Functions</a></li><li class="chapter-item expanded "><a href="chapter2/04-union-types.html"><strong aria-hidden="true">2.4.</strong> Union Types</a></li><li class="chapter-item expanded "><a href="chapter2/05-generics.html"><strong aria-hidden="true">2.5.</strong> Generics</a></li><li class="chapter-item expanded "><a href="chapter2/06-configuring-typescript.html"><strong aria-hidden="true">2.6.</strong> Configuring TypeScript</a></li></ol></li><li class="chapter-item expanded "><a href="chapter3/index.html"><strong aria-hidden="true">3.</strong> Networking Fundamentals</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter3/01-ips-ports-and-domains.html"><strong aria-hidden="true">3.1.</strong> IPs, Ports and Domains</a></li><li class="chapter-item expanded "><a href="chapter3/02-an-http-primer.html"><strong aria-hidden="true">3.2.</strong> An HTTP Primer</a></li><li class="chapter-item expanded "><a href="chapter3/03-more-on-http.html"><strong aria-hidden="true">3.3.</strong> More on HTTP</a></li></ol></li><li class="chapter-item expanded "><a href="chapter4/index.html"><strong aria-hidden="true">4.</strong> Persistence with SQL</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter4/01-setup.html"><strong aria-hidden="true">4.1.</strong> Setup</a></li><li class="chapter-item expanded "><a href="chapter4/02-data-types-and-constraints.html"><strong aria-hidden="true">4.2.</strong> Data Types and Constraints</a></li><li class="chapter-item expanded "><a href="chapter4/03-inserting-updating-and-deleting-data.html"><strong aria-hidden="true">4.3.</strong> Inserting, Updating and Deleting Data</a></li><li class="chapter-item expanded "><a href="chapter4/04-selecting-data.html"><strong aria-hidden="true">4.4.</strong> Selecting Data</a></li><li class="chapter-item expanded "><a href="chapter4/05-modifying-tables.html"><strong aria-hidden="true">4.5.</strong> Modifying Tables</a></li><li class="chapter-item expanded "><a href="chapter4/06-working-with-multiple-tables.html"><strong aria-hidden="true">4.6.</strong> Working with Multiple Tables</a></li></ol></li><li class="chapter-item expanded "><a href="chapter5/index.html"><strong aria-hidden="true">5.</strong> Typesafe SQL with Drizzle</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter5/01-setup.html"><strong aria-hidden="true">5.1.</strong> Setup</a></li><li class="chapter-item expanded "><a href="chapter5/02-inserting-updating-and-deleting-data.html"><strong aria-hidden="true">5.2.</strong> Inserting, Updating and Deleting Data</a></li><li class="chapter-item expanded "><a href="chapter5/03-selecting-data.html"><strong aria-hidden="true">5.3.</strong> Selecting Data</a></li><li class="chapter-item expanded "><a href="chapter5/04-multiple-tables.html"><strong aria-hidden="true">5.4.</strong> Multiple Tables</a></li><li class="chapter-item expanded "><a href="chapter5/05-migrations.html"><strong aria-hidden="true">5.5.</strong> Migrations</a></li></ol></li><li class="chapter-item expanded "><a href="chapter6/index.html"><strong aria-hidden="true">6.</strong> A Vanilla Client</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter6/01-hypertext-markup-language.html"><strong aria-hidden="true">6.1.</strong> Hypertext Markup Language</a></li><li class="chapter-item expanded "><a href="chapter6/02-marking-up-text.html"><strong aria-hidden="true">6.2.</strong> Marking Up Text</a></li><li class="chapter-item expanded "><a href="chapter6/03-hyperlinks-and-images.html"><strong aria-hidden="true">6.3.</strong> Hyperlinks and Images</a></li><li class="chapter-item expanded "><a href="chapter6/04-the-document-object-model.html"><strong aria-hidden="true">6.4.</strong> The Document Object Model</a></li><li class="chapter-item expanded "><a href="chapter6/05-events.html"><strong aria-hidden="true">6.5.</strong> Events</a></li><li class="chapter-item expanded "><a href="chapter6/06-web-forms.html"><strong aria-hidden="true">6.6.</strong> Web Forms</a></li><li class="chapter-item expanded "><a href="chapter6/07-a-simple-client.html"><strong aria-hidden="true">6.7.</strong> A Simple Client</a></li></ol></li><li class="chapter-item expanded "><a href="chapter7/index.html"><strong aria-hidden="true">7.</strong> Adding Spice with React</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter7/01-react-components.html"><strong aria-hidden="true">7.1.</strong> React Components</a></li><li class="chapter-item expanded "><a href="chapter7/02-react-state.html"><strong aria-hidden="true">7.2.</strong> React State</a></li><li class="chapter-item expanded "><a href="chapter7/03-react-effects.html"><strong aria-hidden="true">7.3.</strong> React Effects</a></li></ol></li><li class="chapter-item expanded "><a href="chapter8/index.html"><strong aria-hidden="true">8.</strong> Moving to the Server with Next.js</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter8/01-setup.html"><strong aria-hidden="true">8.1.</strong> Setup</a></li><li class="chapter-item expanded "><a href="chapter8/02-pages-and-layouts.html"><strong aria-hidden="true">8.2.</strong> Pages and Layouts</a></li><li class="chapter-item expanded "><a href="chapter8/03-more-on-routes.html"><strong aria-hidden="true">8.3.</strong> More on Routes</a></li><li class="chapter-item expanded "><a href="chapter8/04-server-and-client-components.html"><strong aria-hidden="true">8.4.</strong> Server and Client Components</a></li></ol></li><li class="chapter-item expanded "><a href="chapter9/index.html"><strong aria-hidden="true">9.</strong> Becoming Pretty with Tailwind CSS</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter9/01-setup.html"><strong aria-hidden="true">9.1.</strong> Setup</a></li><li class="chapter-item expanded "><a href="chapter9/02-typography-utilities.html"><strong aria-hidden="true">9.2.</strong> Typography Utilities</a></li><li class="chapter-item expanded "><a href="chapter9/03-background-utilities.html"><strong aria-hidden="true">9.3.</strong> Background Utilities</a></li><li class="chapter-item expanded "><a href="chapter9/04-size-utilities.html"><strong aria-hidden="true">9.4.</strong> Size Utilities</a></li><li class="chapter-item expanded "><a href="chapter9/05-border-utilities.html"><strong aria-hidden="true">9.5.</strong> Border Utilities</a></li><li class="chapter-item expanded "><a href="chapter9/06-spacing-utilities.html"><strong aria-hidden="true">9.6.</strong> Spacing Utilities</a></li><li class="chapter-item expanded "><a href="chapter9/07-flexbox.html"><strong aria-hidden="true">9.7.</strong> Flexbox</a></li><li class="chapter-item expanded "><a href="chapter9/08-grid.html"><strong aria-hidden="true">9.8.</strong> Grid</a></li></ol></li><li class="chapter-item expanded "><a href="chapter10/index.html"><strong aria-hidden="true">10.</strong> The Project</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter10/01-setup.html"><strong aria-hidden="true">10.1.</strong> Setup</a></li><li class="chapter-item expanded "><a href="chapter10/02-authentication.html"><strong aria-hidden="true">10.2.</strong> Authentication</a></li><li class="chapter-item expanded "><a href="chapter10/03-the-projects-page.html"><strong aria-hidden="true">10.3.</strong> The Projects Page</a></li><li class="chapter-item expanded "><a href="chapter10/04-task-page.html"><strong aria-hidden="true">10.4.</strong> Task Page</a></li><li class="chapter-item expanded "><a href="chapter10/05-deployment.html"><strong aria-hidden="true">10.5.</strong> Deployment</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
