const { expect } = require("chai");
const sinon = require("sinon");
const { createUser } = require("../../users/service")
const User = require("../../users/model")
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe("Users", () => {
  let mongoServer;
  let sandbox;

  // Start the MongoDB in-memory server before running tests
  before(async () => {
    mongoServer = new MongoMemoryServer();
    await mongoServer.start()
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  // Initialize a sandbox for sinon spies/stubs
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  // Close the MongoDB in-memory server and restore sinon after tests
  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    sandbox.restore();
  });
  describe("Create a new user", () => {
    it("should create a new user", async () => {
      const mockUser = { name: "faizan", email: "test@example.com", password: "test" };
      try {
        const createStub = sinon.stub(User, "create").resolves({ _id: "abc123", name: "faizan", email: "test@example.com", password: "test" })

        // calling create user function
        const result = await createUser(mockUser);

        // assert
        expect(createStub.calledOnce).to.be.true;
        expect(result).to.deep.equal({ _id: "abc123", ...mockUser });
      } catch (error) {
        console.log(error);
      }
    })
  })
})