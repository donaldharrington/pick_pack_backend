import apn from "apn";

export const sendNotification = async (
  title,
  body,
  payload,
  deviceToken,
  type,
  badge
) => {
  let options = {
    token: {
      key: "/home/ubuntu/Backend/apns/AuthKey_C2SYC45D3B.p8",
      keyId: "C2SYC45D3B",
      teamId: "GQ7T7AXMNY",
    },
    production: true,
  };

  let service = new apn.Provider(options);

  let note = new apn.Notification();

  note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
  // note.badge = 3;
  note.sound = "ping.aiff";
  note.alert = {
    title: title,
    body: body,
  };

  note.badge = badge;

  note.payload = payload;
  note.contentAvailable = 1;
  note.pushType = "background";
  note.priority = 5;
  if (type === "supplier") {
    note.topic = "com.superkitchen.restaurant";
  } else {
    note.topic = "com.superkitchen.supplier";
  }

  console.log(note.topic);

  let apnsResult = await service.send(note, deviceToken);
  console.log(JSON.stringify(apnsResult));
  service.shutdown();
};

export const sendBroadcastNotification = async (
  title,
  body,
  payload,
  deviceTokens,
  type
) => {
  let options = {
    token: {
      key: "/home/ubuntu/Backend/apns/AuthKey_C2SYC45D3B.p8",
      keyId: "C2SYC45D3B",
      teamId: "GQ7T7AXMNY",
    },
    production: true,
  };

  let service = new apn.Provider(options);

  let note = new apn.Notification();

  note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
  // note.badge = 3;
  note.sound = "ping.aiff";
  note.alert = {
    title: title,
    body: body,
  };

  note.payload = payload;
  note.contentAvailable = 1;
  note.pushType = "background";
  note.priority = 5;
  if (type === "supplier") {
    note.topic = "com.superkitchen.restaurant";
  } else {
    note.topic = "com.superkitchen.supplier";
  }

  let apnsResult = await service.send(note, deviceTokens);
  console.log(JSON.stringify(apnsResult));
  service.shutdown();
};
