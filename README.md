# Watchdog Class Documentation

This documentation provides information about the `Watchdog` class, a utility for monitoring various resources in a Node.js environment.

## Importing

You can import the `Watchdog` class with:

```javascript
const Watchdog = require('your-path-to-watchdog.js');
```

## Instantiation

To instantiate a `Watchdog` object, use the `new` keyword:

```javascript
let watchdog = new Watchdog(timeout, check_interval, debug);
```

- `timeout`: *(Number)* is the timeout value in seconds. This is a required parameter.

- `check_interval`: *(Number)* is the interval in seconds at which to check if a monitor has timed out. It defaults to 600 seconds if not provided.

- `debug`: *(Boolean)* enables or disables debug mode. If set to `true`, additional debugging information is printed to the console. It defaults to `false` if not provided.

## Methods

### `addMonitor(MonitorName)`

Adds a new monitor to the watchdog's store. The `MonitorName` is used as a key in the store.

```javascript
watchdog.addMonitor('myMonitor');
```

### `updateMonitor(MonitorName)`

Updates the last update timestamp of a monitor. If the monitor does not exist, an error is thrown.

```javascript
watchdog.updateMonitor('myMonitor');
```

### `removeMonitor(MonitorName)`

Removes a monitor from the store. If the monitor does not exist, nothing happens.

```javascript
watchdog.removeMonitor('myMonitor');
```

### `getMonitorStatus(MonitorName)`

Returns the timeout status of a monitor. If the monitor does not exist, undefined is returned.

```javascript
let status = watchdog.getMonitorStatus('myMonitor');
```

### `setTimeout(timeout)`

Sets the timeout time to a new value. The `timeout` parameter is in seconds.

```javascript
watchdog.setTimeout(5000);
```

## Events

### `'timeout'`

Emitted when a monitor has been offline longer than the specified timeout time. The event's data is an object that includes the `monitor` and `offline_since` properties.

```javascript
watchdog.on('timeout', (data) => {
    console.log(`Monitor ${data.monitor} has been offline since ${new Date(data.offline_since)}`);
});
```

## Debugging

If debug mode is enabled in the constructor, then a debug message is printed to the console every time a check is performed. This message includes the time since the last update of each monitor and its timeout time.