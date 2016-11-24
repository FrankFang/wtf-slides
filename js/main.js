!function(){
  var map = Array.prototype.map
  var filter = Array.prototype.filter
  var $ = (selector) =>{
    return map.call(document.querySelectorAll(selector), (i)=>i)
  }
  function grow(element) {
    var content = element.textContent
    content = content.replace(/^\s*\n/, '')
    content = content.replace(/\n\s*$/, '')
    var prefix = content.match(/^[ \t]*/)
    var regex = new RegExp('(\\n|^)'+prefix, 'g')
    element.textContent = content.replace(regex, (_, capture)=>capture)
    element.style.height = (element.scrollHeight)+"px";
  }

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
      history: true,
      transitionSpeed: 'fast', // default/fast/slow

      dependencies: [ ]
    })

    $('textarea').map((t)=>{
      grow(t)
    })
  })
}()
