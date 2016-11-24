function loadScript(callback){
  var script = document.createElement('script')
  script.onload = callback
  script.src = 'js/lib.min.js'
  document.head.append(script)
}

function prepare(){
  var body = document.body
  var sections = Array.prototype.filter.call(body.children, (i)=>i.tagName=='SECTION')
  var reveal = document.createElement('div')
  reveal.className = 'reveal'
  var slides = document.createElement('div')
  slides.className = 'slides'
  reveal.appendChild(slides)

  sections.map((s)=>{
    s.setAttribute('data-markdown','')
    slides.appendChild(s)
  })

  body.appendChild(reveal)
  return sections
}

function markdown(sections){

  sections.map((item)=>{
    html = marked(item.textContent)
    item.innerHTML = html
  })
}

loadScript(function(){
  var sections = prepare()
  //markdown(sections)
  Reveal.initialize({
    controls: false,
    center: false,
    transitionSpeed: 'fast', // default/fast/slow

    dependencies: [
      { src: 'plugin/markdown/marked.js', condition: function() { return true } },
      { src: 'plugin/markdown/markdown.js', condition: function() { return true } },
    ]
  })
})
