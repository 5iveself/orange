import { EditorView, basicSetup } from "codemirror"

const editor = document.getElementById("editor")

const view = new EditorView({
  doc: `uniform float u_time;

void main() {
	gl_FragColor = vec4(1.0,0.0,1.0,1.0);
}`,
  parent: editor,
  extensions: [
    basicSetup
  ]
})
