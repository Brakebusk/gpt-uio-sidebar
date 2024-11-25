const iframeHosts = ["gpt.uio.no", "auth.dataporten.no"];
chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

  const RULE = {
    id: 1,
    condition: {
      initiatorDomains: [chrome.runtime.id],
      requestDomains: iframeHosts,
      resourceTypes: ["sub_frame", "main_frame"],
    },
    action: {
      type: "modifyHeaders",
      responseHeaders: [
        { header: "X-Frame-Options", operation: "remove" },
        { header: "Frame-Options", operation: "remove" },
        { header: "Content-Security-Policy", operation: "remove" },
      ],
    },
  };
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [RULE.id],
    addRules: [RULE],
  });
});
