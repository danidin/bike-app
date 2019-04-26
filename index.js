import { pushStateLocationPlugin, servicesPlugin, UIRouter } from '@uirouter/core';
import { Visualizer } from '@uirouter/visualizer';
import { naiveClearRenderedDom, naiveRenderIntoDom } from './render';

exports.bootstrap = function() {
    return Promise.resolve();
}

exports.mount = function() {
    const promise = new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/page1.html');
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
        };
    });

    return promise.then(content =>
        document.getElementById('content').innerHTML = 'TEST'
    );
}

exports.unmount = function() {
    return Promise.resolve()
        .then(() => document.getElementById('content').innerHTML = '');
}
