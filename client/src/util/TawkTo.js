//pass your tawk.to propertyId
export default function tawkTo(propertyId, username) {
  if (!window) {
    throw new Error("DOM is unavailable");
  }
  window.Tawk_API = window.Tawk_API || {};

  window.Tawk_LoadStart = new Date();

  // pass attributes to tawk.to on widget load
  window.Tawk_API.onLoad = () => {
    window.Tawk_API.setAttributes(
      {
        name: username,
      },
      (err) => {}
    );
  };

  const tawk = document.getElementById("tawkId");
  if (tawk) {
    // Prevent TawkTo to create root script if it already exists
    window.Tawk_API.showWidget();
    return window.Tawk_API;
  }

  const scripted = document.createElement("script");
  scripted.id = "tawkId";
  scripted.async = true;
  scripted.src = `https://embed.tawk.to/${propertyId}/1g0ch41u0`;
  scripted.charset = "UTF-8";
  scripted.setAttribute("crossorigin", "*");
  const first_script_tag = document.getElementsByTagName("script")[0];
  if (!first_script_tag || !first_script_tag.parentNode) {
    throw new Error("DOM is unavailable");
  }
  first_script_tag.parentNode.insertBefore(scripted, first_script_tag);
}
