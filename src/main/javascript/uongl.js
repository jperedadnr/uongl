console.log("WELCOME UONGL!");
var FLOATS_PER_TC=2;
var FLOATS_PER_VC=3;
var FLOATS_PER_VERT=(FLOATS_PER_TC * 2 + FLOATS_PER_VC);
var coordStride=4 * FLOATS_PER_VERT;
var colorStride=4;

var buffers = [];
var bufferIdx = 0;

function wgl() {
    var canvas = document.getElementById("jfxcanvas");
    var gl = canvas.getContext("webgl2");
    return gl;
}

function buff(p) {
    bufferIdx++;
    buffers[bufferIdx] = p;
    return bufferIdx;
}

function native_com_sun_prism_es2_GLFactory_nIsGLExtensionSupported(ptr, a) {
    console.log("NISGLEXTENSIONSUPPOERTED!!! a = " + a);
   if (a == "GL_EXT_texture_format_BGRA8888") return false;
    console.log("assume true");
    return true;
}

function native_com_sun_glass_ui_web_WebApplication__invokeAndWait(r) {
    console.log("INVOKEANDWAIT!" + r);
    r.run__V();
    console.log("INVOKEANDWAIT DONE!" + r);
}

// ------------
// WEBGLVIEW 
// ------------

function native_com_sun_glass_ui_web_WebGLView__getNativeView(ptr) {
    console.log("[UONGL] getNetiveView, ptr = " + ptr);
    return 1;
}

function native_com_sun_glass_ui_web_WebGLView__getX(ptr) {
    console.log("[UONGL] getX, ptr = " + ptr);
    return 0;
}

function native_com_sun_glass_ui_web_WebGLView__getY(ptr) {
    console.log("[UONGL] getY, ptr = " + ptr);
    return 0;
}

// ------------
// WEBWINDOW 
// ------------

function native_com_sun_glass_ui_web_WebWindow__setAlpha(ptr, alpha) {
    console.log("[UONGL] setApha, ptr = " + ptr+" and alpha = " +alpha);
    var canvas = document.getElementById("jfxcanvas");
    var ctx = canvas.getContext("webgl2");
    ctx.globalAlpha = alpha;
}

function native_com_sun_glass_ui_web_WebWindow__setIcon(ptr) {
    console.log("[UONGL] setIcon, ptr = " + ptr);
}

function native_com_sun_glass_ui_web_WebWindow__setResizable(ptr, resizable) {
    console.log("[UONGL] setResizable, ptr = " + ptr+" and r = " +resizable);
}

function native_com_sun_glass_ui_web_WebWindow__setFocusable(ptr, f) {
    console.log("[UONGL] setFocusable, ptr = " + ptr+" and f = " +f);
}

function native_com_sun_glass_ui_web_WebWindow__requestFocus(ptr, evt) {
    console.log("[UONGL] requestFocus, ptr = " + ptr+" and evt = " +evt);
}

function native_com_sun_glass_ui_web_WebWindow__setBackground(ptr, r, g, b) {
    console.log("[UONGL] setBGColor, ptr = " + ptr+" and r = " +r+", g = " +g+", b = " +b);
    var red = 256 * r;
    var green = 256 * g;
    var blue = 256*b;
    var gl = wgl();
    var canvas = document.getElementById("jfxcanvas");
    canvas.style.backgroundColor = 'rgb('+red+','+ green+','+ blue+')';
}

function native_com_sun_glass_ui_web_WebWindow__setVisible(ptr, vis) {
    console.log("[UONGL] setVisible, ptr = " + ptr+" and vis = " +vis);
}

function native_com_sun_glass_ui_web_WebWindow__setMinimumSize(ptr, width, height) {
    console.log("[UONGL] setMinimumSize to "+ width+", " + height);
}

function native_com_sun_glass_ui_web_WebWindow__setMaximumSize(ptr, width, height) {
    console.log("[UONGL] setMaximumSize to "+ width+", " + height);
}

function native_com_sun_glass_ui_web_WebWindow__setView(ptr, view) {
    console.log("[UONGL] setView to "+ view);
}

function native_com_sun_glass_ui_web_WebGLView__setParent(ptr, parentptr) {
    console.log("[UONGL] setParentPtr ");
}

// ------------
// GLCONTEXT 
// ------------

function native_com_sun_prism_es2_GLContext_nActiveTexture(ptr, texUnit) {
    console.log("[UONGL] nActiveTexture ctx = "+ptr+", id = "+texUnit);
    var gl = wgl();
    gl.activeTexture(gl.TEXTURE0+texUnit);
    glErr(gl);
}

function native_com_sun_prism_es2_GLContext_nBindFBO(nativeCtxInfo, nativeFBOID) {
    console.log("[UONGL] nBindFBO ctx = "+nativeCtxInfo+", id = "+nativeFBOID);
    var gl = wgl();
    if (nativeFBOID == 0) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    } else {
        var buffer = buffers[nativeFBOID];
        gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
    }
    glErr(gl);
}

function native_com_sun_prism_es2_GLContext_nBindTexture(nativeCtxInfo, texId) {
console.log("UONGL bindTexture with id "+texId);
    var gl = wgl();
    var tex = buffers[texId];
    gl.bindTexture(gl.TEXTURE_2D, tex);
    glErr(gl);
}

function native_com_sun_prism_es2_GLContext_nBlendFunc(ptr, cf, df) {
console.log("UONGL bbendFunv with c = "+cf+" and d = " + df);
    var gl = wgl();
    gl.blendFunc(cf, df);
    glErr(gl);
}

function native_com_sun_prism_es2_GLContext_nClearBuffers (ctxInfo,
        red, green, blue, alpha,
        clearColor, clearDepth, ignoreScissor){
console.log("UONGL clearBuffers, cc = " + clearColor+", cd = " + clearDepth+", is = " + ignoreScissor);
console.log("TODO!!!");
    var gl = wgl();
    var clearBIT = null;
    if (clearColor) {
        gl.clearColor(1, green, blue, alpha);
        clearBIT = gl.COLOR_BUFFER_BUT;
    }
    if (clearBIT != null) {
        gl.clear(clearBIT);
    }
    glErr(gl);
}

function native_com_sun_prism_es2_GLContext_nCompileShader(ptr, src, vert) {
    console.log("[UONGL] compile shader ");
    var gl = wgl();
    var shader;
    if (vert) {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    var msg = gl.getShaderInfoLog(shader);
    if (msg.length >0) {
console.log("ERROR! " + msg);
    }
    answer = buff(shader);
    glErr(gl);
    return answer;
}

function native_com_sun_prism_es2_GLContext_nCreateFBO (ptr, texId) {
    console.log("[UONGL] ncreateFBO ");
    var gl = wgl();
    var buffer = gl.createFramebuffer();
    var tex = buffers[texId];
    gl.bindFramebuffer(gl.FRAMEBUFFER, buffer)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
console.log("[UONGL] createFBO will return buffer " + buffer);
    answer = buff(buffer);
    glErr(gl);
    return answer;
}

function native_com_sun_prism_es2_GLContext_nCreateIndexBuffer16 (ptr, data, n) {
    var gl = wgl();
    var buffer = gl.createBuffer();
    console.log("[UONGL] ncreateIndexBuffer16, n = "+n);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
    console.log("[UONGL] BUFFER will return " + buffer);
    bufferIdx++;
    buffers[bufferIdx] = buffer;
    glErr(gl);
    return bufferIdx;
}

function native_com_sun_prism_es2_GLContext_nCreateProgram(ptr, vertID, fragIDArr, numAttrs, attrs, indexs) {
    var gl = wgl();
    console.log("[UONGL] ncreateProgram");
    var program = gl.createProgram();
    var answer = buff(program);
    var vertexShader = buffers[vertID];
    gl.attachShader(program, vertexShader);
    for (i = 0 ; i < fragIDArr.length; i++ ) {
        var fragShader = buffers[fragIDArr[i]];
        gl.attachShader(program, fragShader);
    }
    for (i = 0; i < numAttrs; i++) {
console.log("[UONGL] bindAttribloc " + attrs[i]+" to " + indexs[i]);
        gl.bindAttribLocation(program, indexs[i], attrs[i]);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        var det = gl.getProgramInfoLog(program);
        console.error("Error compiling shader: \n" + det);
    } else {
        console.log("[UONGL] shader program compiled!");
    }
    glErr(gl);
    return answer;
}

function native_com_sun_prism_es2_GLContext_nCreateTexture (ptr, width, height) {
    var gl = wgl();
    console.log("[UONGL] ncreateTexture w = "+width+", h = "+height);
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4 * width * height));
    var answer = buff(texture);
    console.log("[UONGL] ncreateTexture created texture with id " + answer);
    glErr(gl);
    return answer;
}

function native_com_sun_prism_es2_GLContext_nDrawIndexedQuads(ptr, numVertices, dataf, datab) {
    var gl = wgl();
    console.log("[UONGL] nDrawIndexedQuads nv = "+numVertices+", df = " + dataf.length+", db = " + datab.length);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, coordStride, dataf);
    gl.vertexAttribPointer(2, 2, gl.FLOAT, gl.FALSE, coordStride, dataf + FLOATS_PER_VC);
    gl.vertexAttribPointer(3, 2, gl.FLOAT, gl.FALSE, coordStride, dataf + FLOATS_PER_VC + FLOATS_PER_TC);
    gl.vertexAttribPointer(1, 4, gl.UNSIGNED_BYTE, gl.TRUE, colorStride, datab);
        // ctx->vbFloatData = pFloat;
// ctx->vbByteData = pByte;
    var numQuads = numVertices/4;
gl.drawElements(gl.TRIANGLES, numQuads * 2 * 3, gl.UNSIGNED_SHORT, 0);
    console.log("[UONGL] nDrawIndexedQuads done");
    glErr(gl);

}

function native_com_sun_prism_es2_GLContext_nEnableVertexAttributes(ptr){
    var gl = wgl();
    for (i = 0; i < 4; i++) {
        gl.enableVertexAttribArray(i);
    }
    console.log("[UONGL] nEnableVertexAttr DONE");
    glErr(gl);
}

function native_com_sun_prism_es2_GLContext_nGenAndBindTexture(ptr){
console.log("[UONGL] GenAndBindTexture");
    var gl = wgl();
    var texture = gl.createTexture();
    var tid = buff(texture);
    gl.bindTexture(gl.TEXTURE_2D, texture);
console.log("[UONGL] GenAndBindTexture created new texture with id " + tid);
    glErr(gl);
    return tid;

}

function native_com_sun_prism_es2_GLContext_nGetUniformLocation(ptr, pid, val){
console.log("[UONGL] GetUniformLocation for programId "+ pid+" and val = " + val);
    var gl = wgl();
    var answer = gl.getUniformLocation(buffers[pid], val);
console.log("result = " + answer);
    glErr(gl);
    return answer;
}

function native_com_sun_prism_es2_GLContext_nPixelStorei(pname, value) {
    var gl = wgl();
    var name = null;
    if (pname == 60) name = gl.UNPACK_ALIGNMENT;
    if (pname == 61) name = gl.UNPACK_ROW_LENGTH;
    if (pname == 62) name = gl.UNPACK_SKIP_PIXELS;
    if (pname == 63) name = gl.UNPACK_SKIP_ROWS;
    gl.pixelStorei(name, value);
    glErr(gl);
}

function native_com_sun_prism_es2_GLContext_nSetIndexBuffer(ptr, bufferId ) {
    var gl = wgl();
    console.log("[UONGL] nSetIndexBuffer ELEMENT_ARRAY_BUFFER to buffer with id "+ bufferId);
    var buffer = buffers[bufferId];
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    console.log("[UONGL] nSetIndexBuffer done to buffer "+ buffer);
    glErr(gl);
}

function native_com_sun_prism_es2_GLContext_nTexImage2D0(target, level, 
 internalFormat, width, height, border, format, type,
        pixels, pixelsByteOffset, useMipmap) {
    var gl = wgl();
    console.log("[UONGL] nTexImage2D0 pbo = "+ pixelsByteOffset);
console.log("TARGET = " + target);
console.log("LEVEL = " + level);
console.log("FORMAT = " + format);
console.log("IF = " + internalFormat);
console.log("TYPE = " + type);
    if (useMipmap) {
        console.log("[UONGL] nTexImage2D0 MIPMAP!");
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    }
    gl.texImage2D(getTextureConstant(target), level, getTextureConstant(internalFormat), width, height, 0, getTextureConstant(format), getTextureConstant(type), pixels);
    glErr(gl);
    return true;
}
function native_com_sun_prism_es2_GLContext_nUniformMatrix4fv(ptr, loc, transpose, values ) {
    var gl = wgl();
    console.log("[UONGL] nUniformMatrix4fv loc = "+ loc);
    gl.uniformMatrix4fv(loc, false, values);
    console.log("[UONGL] nUniformMatrix4fv DONE ");
    glErr(gl);
}

function native_com_sun_prism_es2_GLContext_nUpdateViewport(ptr, x, y, w, h) {
    console.log("[UONGL] nUpdateViewport to "+x+", "+y+", "+w+", "+h);
    var gl =wgl();
    gl.viewport(x,y,w,h); 
    console.log("[UONGL] nUpdateViewport to "+x+", "+y+", "+w+", "+h+" DONE");
    glErr(gl);
}

function native_com_sun_prism_es2_GLContext_nUpdateWrapState(ptr, texID, wrapMode) {
    var gl = wgl();
    var modeS = gl.REPEAT;
    var modeT = gl.REPEAT;
    if (wrapMode = 101) {
        modeS = gl.CLAMP_TO_EDGE;
        modeT = gl.CLAMP_TO_EDGE;
    }
    console.log("[UONGL] nUpdateWrapState mode = "+ wrapMode+" == " + modeS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, modeS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, modeT);
    glErr(gl);
}


function native_com_sun_prism_es2_GLContext_nUseProgram(ptr, programId ) {
    console.log("[UONGL] nUseProgram with id "+ programId);
    var gl = wgl();
    var program = buffers[programId];
    gl.useProgram(program);
    glErr(gl);
}

function native_com_sun_prism_es2_GLContext_nTexSubImage2D0() {
    console.log("[UONGL] nTexSubImage2D0 NOT IMPLEMENTED ");
}


function native_com_sun_prism_es2_GLContext_nTexParamsMinMax() {
    console.log("[UONGL] nTexParamsMinMax NOT IMPLEMENTED");
}

// ------------
// WEBGLCONTEXT 
// ------------

function native_com_sun_prism_es2_WebGLContext_getIntParam(param) {
    var gl = wgl();
console.log("[UONGL] getIntParam for " + param) ;
    var answer = 1;
    if (param == 120) {
        answer = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
    }
    if (param == 122) {
        answer = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    }
    if (param == 123) {
        answer = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    }
    if (param == 124) {
        answer = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
    }
    if (param == 125) {
        answer = 4 * gl.getParameter(gl.MAX_VARYING_VECTORS);
    }
    if (param == 127) {
        answer = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
    }
    if (param == 128) {
        answer = 4 * gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
    }
    console.log("[UONGL] getIntParam asked for " + param+" results in " + answer);
    return answer;
}
function native_com_sun_prism_es2_WebGLContext_nGetNativeHandle(nativeCtxInfo) {
    console.log("[UONGL] WebGLContext_nGetNativeHandle always return 1");
    return 1;
}

function native_com_sun_prism_es2_WebGLContext_nInitialize(nativeDInfo, nativePFInfo,
            nativeshareCtxHandle, vSyncRequest) {
    console.log("[UONGL] WebGLContext_nInitialize always return 1");
    return 1;
}

function native_com_sun_prism_es2_WebGLContext_nMakeCurrent() {
    console.log("[UONGL] WebGLContext_nMakeCurrent NO-OP");
}

function getTextureConstant(src) {
    var gl = wgl();

    if (src == 20) return gl.FLOAT;
    if (src == 21) return gl.UNSIGNED_BYTE;
    if (src == 22) return gl.UNSIGNED_INT_8_8_8_8_REV;
    if (src == 23) return gl.UNSIGNED_INT_8_8_8_8;
    if (src == 40) return gl.RGBA;
    if (src == 41) return gl.BGRA;
    if (src == 42) return gl.RGB;
    if (src == 43) return gl.LUMINANCE;
    if (src == 44) return gl.ALPHA;
    if (src == 45) return gl.RGBA32F;
    if (src == 50) return gl.TEXTURE_2D;
    if (src == 51) return gl.TEXTURE_BINDING_2D;
    if (src == 52) return gl.NEAREST;
    if (src == 53) return gl.LINEAR;
    if (src == 54) return gl.NEAREST_MIPMAP_NEAREST;
    if (src == 55) return gl.LINEAR_MIPMAP_LINEAR;
    console.log("NO TEXTURE CONSTANT FOUND for "+src);
    return -1;
}

function glErr(gl) {
    var err = gl.getError();
    if (err!= 0) {
        console.log("GL ERROR!");
        console.error("WE HAVE a GL ERROR");
        throw new Error("gl-error");
    }
}
