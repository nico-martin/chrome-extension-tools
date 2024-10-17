declare const __SCRIPT__: string
const injectTime = performance.now()
;(async () => {
  const { onExecute } = await import(/* @vite-ignore */ getExtensionResourceUrl(__SCRIPT__)) as ContentScriptAPI.ModuleExports
  // this is the entry point of the content script, it will run each time this script is injected
  onExecute?.({ perf: { injectTime, loadTime: performance.now() - injectTime } })
})().catch(console.error)

function getExtensionResourceUrl(path: string) {
  // replacing chrome.runtime.getURL due to an issue introduced in Chrome 130 update
  return `chrome-extension://${chrome.runtime.id}/${path}`;
}

export {}
