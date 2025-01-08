// @ts-nocheck
export const trackComponentRegistered = (componentName: string) => {
  // Data layer Web component created
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "event": "customElementRegistered",
    "element": componentName
  });
};

export const trackComponent = (component:any, componentName:string, trackEvents:any) => {

  // Data layer Web component created
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "event": "customElementAdded",
    "element": componentName
  });

  trackEvents.forEach((eventName:string) => {
    component.addEventListener(eventName, function(event:any){

      const eventDetails = {
        "event": eventName,
        "element": componentName,
        "target": event.target
      };

      Object.keys(event.detail).forEach((eventKey:string) => {

        const eventDetail = event.detail[eventKey];
        eventDetails[eventKey] = eventDetail;
      });
      
      window.dataLayer.push(eventDetails);
    });
  });

  return true;
};