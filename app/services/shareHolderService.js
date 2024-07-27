const shareHolder = require("../models/shareHolder");
const itemShareHolder = require("../models/itemShareHolder");

exports.getShareHolders = async () => {
  try {
    const result = await shareHolder.find();
    return {
      success: true,
      shareHolders: result,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
exports.getShareHolder = async (id) => {
  try {
    const result = await shareHolder.findById(id);
    const relatedItemShareHolders = await itemShareHolder.find();
    // .populate("relatedShareHolder relatedItem");
    return {
      success: true,
      shareHolder: result,
      relatedItemShareHolders,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
exports.createShareHolder = async (data) => {
  try {
    const isShareHolderExisted = await shareHolder.findOne({
      email: data.email,
    });
    if (isShareHolderExisted) {
      return {
        success: false,
        message: "Email already exists",
      };
    }
    const result = await shareHolder.create(data);

    // ItemShareHolder Create
    const payload = {
      relatedShareHolder: result.id,
      relatedItem: [
        { itemId: "66a482340bbe57373e97452a", percent: 200 },
        { itemId: "66a482340bbe57373e97452a", percent: 300 },
      ],
    };

    payload.relatedItem.map(async (item) => {
      await itemShareHolder.create({
        relatedShareHolder: payload.relatedShareHolder,
        relatedItem: item.itemId,
        percent: item.percent,
      });
    });

    return {
      success: true,
      shareHolder: result,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
exports.updateShareHolder = async (id, data) => {
  try {
    let result = await shareHolder.findByIdAndUpdate(id, data, { new: true });
    return {
      success: true,
      shareHolder: result,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

exports.deleteShareHolder = async (id) => {
  try {
    await shareHolder.findByIdAndDelete(id);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
