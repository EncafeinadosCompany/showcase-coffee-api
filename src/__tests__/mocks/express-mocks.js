const mockRequest = (data = {}) => ({
    params: data.params || {},
    body: data.body || {},
    query: data.query || {},
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

module.exports = { mockRequest, mockResponse };